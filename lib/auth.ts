import { getServerSession, type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import Stripe from "stripe";
import EmailProvider, { SendVerificationRequestParams } from "next-auth/providers/email";
import { Resend } from 'resend';
import { scheduleFollowUpEmail } from "./schedule-email";
// import { google } from "googleapis";
// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;
const FreePriceId = process.env.NEXT_PUBLIC_STRIPE_FREE_PRICE_ID as string;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // authorization: {
      //   params: {
      //     scope: 'https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl',
      //   },
      // },
    }),
    EmailProvider({
      server: '',
      from: 'noreply@qrexperiences.com',
      sendVerificationRequest: async (params: SendVerificationRequestParams) => {
        let { identifier, url, provider } = params;
    
        try {
          let resend = new Resend(process.env.RESEND_API_KEY!)
          await resend.emails.send({
            from: provider.from,
            to: identifier,
            subject: 'Your QR Login Link',
            html: `
              <html>
                <head>
                  <style>
                    body {
                      font-family: 'Arial', sans-serif;
                      margin: 0;
                      padding: 0;
                      background-color: #f7f7f7;
                    }
                    .container {
                      max-width: 600px;
                      margin: 20px auto;
                      background-color: #ffffff;
                      padding: 30px;
                      border-radius: 8px;
                      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    h2 {
                      color: #333;
                      font-size: 24px;
                      margin-bottom: 20px;
                    }
                    p {
                      color: #555;
                      font-size: 16px;
                      line-height: 1.5;
                      margin-bottom: 15px;
                    }
                    .cta-button {
                      display: inline-block;
                      background-color: #6b7280;
                      color: #ffffff;
                      font-size: 16px;
                      font-weight: bold;
                      padding: 12px 20px;
                      text-decoration: none;
                      border-radius: 5px;
                      margin-top: 20px;
                      text-align: center;
                    }
                    .footer {
                      font-size: 12px;
                      color: #888;
                      text-align: center;
                      margin-top: 40px;
                    }
                    .footer a {
                      color: #007bff;
                      text-decoration: none;
                    }
                    hr {
                      border: 0;
                      border-top: 1px solid #eee;
                      margin: 30px 0;
                    }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <h2>Welcome to QR Experiences!</h2>
                    <p>Hello,</p>
                    <p>Welcome to QR Experiences. To get started, click the link below to sign in to your account and create a QR Experience.</p>
                    
                    <a href="${url}" class="cta-button">Sign In Now</a>
                    
                    <p>Alternatively, you can copy and paste this URL into your browser:</p>
                    <p><a href="${url}">${url}</a></p>
                    
                    <hr />
                    <p class="footer">
                      <a href="https://qrexperiences.com" target="_blank">Visit QR Experiences</a>
                    </p>
                  </div>
                </body>
              </html>
            `,
          });
    
          console.log(`Verification email sent to ${identifier}`);
        } catch (error) {
          console.error("Error sending verification email:", error);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: `/login`,
    verifyRequest: `/login`,
    error: "/login",
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: VERCEL_DEPLOYMENT
          ? `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
          : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  callbacks: {
    async jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      session.user = {
        ...session.user,
        id: token.user?.id,
        username: token?.user?.username,
        email: token?.user?.email,
        stripeCustomerId: token?.user?.stripeCustomerId,
        stripeSubscriptionId: token?.user?.stripeSubscriptionId,
        stripePriceId: token?.user.stripePriceId,
        stripeCurrentPeriodEnd: token?.user.stripeCurrentPeriodEnd,
        isActive: token?.user?.isActive,
        role: token?.user?.role,
        accessToken: token.accessToken,
        siteCount: token?.user?.siteCount,
        siteMatch: token?.user?.siteMatch,
      };
      return session;
    },
    async signIn({ user }: { user: any }) {
      if (user) {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          const siteCount = existingUser
            ? await prisma.site.count({ where: { userId: existingUser.id } })
            : 0;

          const role = existingUser ? existingUser.role : null;
          const siteLimit = getSiteLimit(role);
          const siteMatch = siteCount >= siteLimit;

          if (existingUser) {
            await prisma.user.update({
              where: { id: existingUser.id },
              data: {
                isActive: true,
                siteCount,
                siteMatch,
              },
            });
          } else {
            const stripeCustomer = await stripe.customers.create({
              email: user.email!,
              name: user.name!,
            });

            await prisma.user.create({
              data: {
                id: user.id,
                email: user.email!,
                name: user.name!,
                stripeCustomerId: stripeCustomer.id,
                stripeSubscriptionId: FreePriceId,
                stripePriceId: FreePriceId,
                stripeCurrentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                isActive: true,
                siteCount: 0,
                siteMatch: false,
              },
            });
          }
          scheduleFollowUpEmail(user.createdAt, user.email);

          await prisma.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: "google",
                providerAccountId: user.id,
              },
            },
            update: {
              userId: existingUser ? existingUser.id : user.id,
            },
            create: {
              provider: "google",
              providerAccountId: user.id,
              userId: existingUser ? existingUser.id : user.id,
              type: "oauth",
            },
          });

        } catch (error) {
          console.error("Error creating or updating Stripe customer or linking accounts:", error);
        }
      }
      return true;
    },
  },
};

export function getSession() {
  return getServerSession(authOptions) as Promise<{
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      image: string;
      storeId: string;
      isActive: boolean;
      stripeId: string;
      role: string;
      stripeCustomerId: string;
      stripeSubscriptionId: string;
      stripePriceId: string;
      stripeCurrentPeriodEnd: Date;
      accessToken: string;
      siteCount: number;
      siteMatch: boolean;
    };
  } | null>;
}

export function withSiteAuth(action: any) {
  return async (
    formData: FormData | null,
    siteId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session) {
      return {
        error: "Not authenticated",
      };
    }
    const site = await prisma.site.findUnique({
      where: {
        id: siteId,
      },
    });
    if (!site || site.userId !== session.user.id) {
      return {
        error: "Not authorized",
      };
    }

    return action(formData, site, key);
  };
}

export function withPostAuth(action: any) {
  return async (
    formData: FormData | null,
    postId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        site: true,
      },
    });
    if (!post || post.userId !== session.user.id) {
      return {
        error: "Post not found",
      };
    }

    return action(formData, post, key);
  };
}

// Helper function to get site limit based on role
function getSiteLimit(role: string | null) {
  switch (role) {
    case 'CREATOR':
      return 10; // Adjust as necessary
    case 'INFLUENCER':
      return 1;
    case 'USER':
      return 1;
    case 'MANAGER':
      return Infinity; // Unlimited for managers
    default:
      return 1;
  }
}
