import Stripe from "stripe";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY! as string, {
  apiVersion: "2023-10-16",
});

// Define the enum if not imported directly
enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  INFLUENCER = "INFLUENCER",
  CREATOR = "CREATOR",
  MANAGER = "MANAGER",
  SUBSCRIBER = "SUBSCRIBER"
}

// Role mapping based on plan IDs
const roleMapping: Record<string, UserRole> = {
  [process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID!]: UserRole.CREATOR,
  [process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID!]: UserRole.CREATOR,
  [process.env.NEXT_PUBLIC_STRIPE_SEMIPRO_MONTHLY_PLAN_ID!]: UserRole.CREATOR,
  [process.env.NEXT_PUBLIC_STRIPE_SEMIPRO_YEARLY_PLAN_ID!]: UserRole.CREATOR,
  [process.env.NEXT_PUBLIC_STRIPE_INFLUENCER_PRICE_ID!]: UserRole.INFLUENCER,
  [process.env.NEXT_PUBLIC_STRIPE_FREE_PRICE_ID!]: UserRole.USER,
  [process.env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID!]: UserRole.MANAGER,
  [process.env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID!]: UserRole.MANAGER,
};


export async function POST(req: Request) {
  const body = await req.text(); // Read raw body
  const signature = req.headers.get("stripe-signature") as string; // Get Stripe signature header

  console.log('Received request body:', body);
  console.log('Received Stripe-Signature header:', signature);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
    console.log("Received webhook event:", event);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Webhook Error: ${error.message}`, { body, signature });
      return new Response(`Webhook Error: ${error.message}`, { status: 200 });
    } else {
      console.error('Unknown webhook error', { body, signature });
      return new Response('Unknown webhook error', { status: 200 });
    }
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const subscriptionId = session.subscription as string;
      const userId = session.metadata?.userId;

      if (userId) {
        console.log(`Processing checkout.session.completed for user ${userId} and subscription ${subscriptionId}`);

        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const planId = subscription.items.data[0].price.id;
        const role = roleMapping[planId] || "USER"; // Default to "USER" if the plan ID is not found

        try {
          const updateResult = await prisma.user.update({
            where: { id: userId },
            data: {
              stripeSubscriptionId: subscription.id,
              stripeCustomerId: subscription.customer as string,
              stripePriceId: planId,
              stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
              role: role, // Update the user role based on the subscription plan
            },
          });

          console.log(`Updated user ${userId}:`, updateResult);
        } catch (prismaError) {
          console.error('Error updating user in Prisma:', prismaError);
        }
      } else {
        console.error(`User ID not found in metadata for session ${session.id}`);
      }
    }

    if (event.type === "invoice.payment_succeeded") {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId = invoice.subscription as string;
      const userId = invoice.metadata?.userId;

      if (invoice.billing_reason !== "subscription_create" && userId) {
        console.log(`Processing invoice.payment_succeeded for user ${userId} and subscription ${subscriptionId}`);

        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const planId = subscription.items.data[0].price.id;
        const role = roleMapping[planId] || "USER"; // Default to "USER" if the plan ID is not found

        try {
          const updateResult = await prisma.user.update({
            where: { id: userId },
            data: {
              stripeSubscriptionId: subscription.id,
              stripeCustomerId: subscription.customer as string,
              stripePriceId: planId,
              stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
              role: role, // Update the user role based on the subscription plan
            },
          });

          console.log(`Updated user ${userId}:`, updateResult);
        } catch (prismaError) {
          console.error('Error updating user in Prisma:', prismaError);
        }
      } else {
        console.error(`User ID not found in metadata or billing reason is subscription_create for invoice ${invoice.id}`);
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error processing event: ${error.message}`, { event, body });
      return new Response(`Error processing event: ${error.message}`, { status: 200 });
    } else {
      console.error('Unknown error processing event', { event, body });
      return new Response('Unknown error processing event', { status: 200 });
    }
  }

  return new Response(null, { status: 200 });
}
