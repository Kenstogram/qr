"use server";

import { getSession } from "../lib/auth";
import { stripe } from "../lib/stripe";
import { getUserSubscriptionPlan } from "../lib/subscription";
import { openCustomerPortal } from "@/actions/open-customer-portal";

export type ResponseAction = {
  status: "success" | "error";
  stripeUrl?: string;
};

const billingUrl = "https://qrexperiences.com/pricing";

export async function generateUserStripe(priceId: string): Promise<ResponseAction> {
  try {
    // Retrieve the current user session
    const session = await getSession();
    if (!session || !session.user) {
      throw new Error("User session not found");
    }
    const user = session.user;

    // Fetch the user's current subscription plan
    const currentPlan = await getUserSubscriptionPlan(user.id);
    // Check if the user already has an active subscription with the given priceId
    if (currentPlan && currentPlan.stripePriceId === priceId) {
      return {
        status: "success",
        stripeUrl:"https://app.qrexperiences.com",
      };
    }

    // Create a new Stripe checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.email,
      line_items: [
        {
          price: priceId, // Use the provided priceId
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
      },
    });

    // Return the URL to be used for redirection on the client-side
    return { status: "success", stripeUrl: stripeSession.url as string };
  } catch (error) {
    console.error("Failed to generate user Stripe session", error);
    return { status: "error" };
  }
}
