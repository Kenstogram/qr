"use client";

import { useTransition } from "react";
import { generateUserStripe } from "@/actions/generate-user-stripe";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { SubscriptionPlan, UserSubscriptionPlan } from "@/utils/types";

interface BillingFormButtonProps {
  offer: SubscriptionPlan;
  subscriptionPlan: UserSubscriptionPlan;
  year: boolean;
}

export function BillingFormButton({
  year,
  offer,
  subscriptionPlan,
}: BillingFormButtonProps) {
  const [isPending, startTransition] = useTransition();

  // Bind the function with parameters
  const generateUserStripeSession = generateUserStripe.bind(
    null,
    offer.stripeIds[year ? "yearly" : "monthly"] ?? "",
  );

  // Update stripeSessionAction to handle the URL from the response
  const stripeSessionAction = () => {
    startTransition(async () => {
      try {
        const result = await generateUserStripeSession();
        if (result.status === "success" && result.stripeUrl) {
          window.location.href = result.stripeUrl; // Redirect on client-side
        } else {
          console.error("Failed to generate Stripe session");
        }
      } catch (error) {
        console.error("Failed to generate user Stripe session", error);
      }
    });
  };

  const userOffer =
    subscriptionPlan.stripePriceId ===
    offer.stripeIds[year ? "yearly" : "monthly"];

  const isStarterPlan = subscriptionPlan.title === "LivestreamQR Free Plan";

  return (
    <Button
      variant={userOffer ? "outline" : "outline"}
      disabled={isPending}
      onClick={stripeSessionAction}
    >
      {isPending ? (
        <>
          <Icons.goal className="mr-2 size-4 animate-spin" /> Loading...
        </>
      ) : (
        <>
          {userOffer
            ? "Go to Dashboard"
            : isStarterPlan
            ? "Upgrade"
            : "Switch Plan"}
        </>
      )}
    </Button>
  );
}
