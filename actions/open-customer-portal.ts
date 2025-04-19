"use server";

import { getSession } from "../lib/auth"; // Import getSession

import { stripe } from "../lib/stripe";

export type responseAction = {
  status: "success" | "error";
  stripeUrl?: string;
};

const billingUrl = "https://app.qrexperiences.com/settings";

// Remove redirect from here
export async function openCustomerPortal(
  userStripeId: string,
): Promise<responseAction> {
  let redirectUrl: string = "";

  const session = await getSession();
  try {
    if (!session) {
      return { status: "error" }; // Handle session error
    }

    if (userStripeId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userStripeId,
        return_url: billingUrl,
      });

      redirectUrl = stripeSession.url as string;
    }
  } catch (error) {
    console.error("Failed to generate user stripe session", error);
    return { status: "error" }; // Handle error
  }

  return { status: "success", stripeUrl: redirectUrl };
}
