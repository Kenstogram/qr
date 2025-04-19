// @ts-nocheck
// TODO: Fix this when we turn strict mode on.
import { pricingData } from "@/config/subscriptions";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { UserSubscriptionPlan } from "../utils/types";

export async function getUserSubscriptionPlan(
  userId: string
): Promise<UserSubscriptionPlan> {
  if (!userId) throw new Error("Missing parameters");

  // Retrieve user from the database
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const FreePriceId = process.env.NEXT_PUBLIC_STRIPE_FREE_PRICE_ID as string;

  // Default values for missing fields
  let updateData = {} as Partial<{
    stripeCurrentPeriodEnd: Date;
    stripePriceId: string;
    stripeSubscriptionId: string;
  }>;

  if (!user.stripeCurrentPeriodEnd) {
    updateData.stripeCurrentPeriodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
  }
  if (!user.stripePriceId) {
    updateData.stripePriceId = FreePriceId;
  }
  if (!user.stripeSubscriptionId) {
    updateData.stripeSubscriptionId = FreePriceId;
  }

  // Update user in the database if necessary
  if (Object.keys(updateData).length > 0) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: updateData,
    });
  }

  // Re-fetch the user to get the latest data
  const updatedUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!updatedUser) {
    throw new Error("User not found after update");
  }

  // Check if the user is on a paid plan
  const isPaid =
    updatedUser.stripePriceId &&
    updatedUser.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now();

  // Find the pricing data corresponding to the user's plan
  const userPlan = pricingData.find(
    (plan) => plan.stripeIds.monthly === updatedUser.stripePriceId || plan.stripeIds.yearly === updatedUser.stripePriceId
  );

  // Use Free plan if no valid user plan is found
  const plan = userPlan
    ? userPlan
    : pricingData.find(plan => plan.stripeIds.monthly === FreePriceId || plan.stripeIds.yearly === FreePriceId) || pricingData[0];

  const interval = isPaid
    ? userPlan?.stripeIds.monthly === updatedUser.stripePriceId
      ? "month"
      : "year"
    : null;

  let isCanceled = false;
  if (isPaid && updatedUser.stripeSubscriptionId) {
    try {
      const stripePlan = await stripe.subscriptions.retrieve(
        updatedUser.stripeSubscriptionId
      );
      isCanceled = stripePlan.cancel_at_period_end;
    } catch (error) {
      console.error("Error retrieving subscription from Stripe:", error);
    }
  }

  return {
    ...plan,
    ...updatedUser,
    stripeCurrentPeriodEnd: updatedUser.stripeCurrentPeriodEnd?.getTime(),
    isPaid,
    interval,
    isCanceled,
  };
}
