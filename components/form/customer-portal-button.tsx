"use client";
import React from "react";
import { useTransition } from "react";
import { openCustomerPortal } from "../../actions/open-customer-portal";
import LoadingSpinner from "./loading-spinner";
import { Button } from "../../components/ui/button";

interface CustomerPortalButtonProps {
  userStripeId: string;
}

export function CustomerPortalButton({
  userStripeId,
}: CustomerPortalButtonProps) {
  const [isPending, startTransition] = useTransition();

  const generateUserStripeSession = async () => {
    try {
      const result = await openCustomerPortal(userStripeId);
      if (result.status === "success" && result.stripeUrl) {
        window.location.href = result.stripeUrl; // Redirect on client-side
      } else {
        // Handle error if needed
        console.error("Failed to open customer portal");
      }
    } catch (error) {
      console.error("Failed to generate user stripe session", error);
    }
  };

  const stripeSessionAction = () => {
    startTransition(() => {
      generateUserStripeSession();
    });
  };

  return (
    <Button
      className="bg-stone-200 text-black rounded-full z-90"
      disabled={isPending}
      onClick={stripeSessionAction}
    >
      {isPending ? <LoadingSpinner /> : "Manage Subscription"}
    </Button>
  );
}
