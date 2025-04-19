import Link from "next/link";
import * as React from "react";
import { CustomerPortalButton } from "@/components/form/customer-portal-button";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatDate } from "@/lib/utils";
import { UserSubscriptionPlan } from "@/utils/types";
import { UpgradeCard } from "@/components/upgrade-card";

interface BillingInfoProps extends React.HTMLAttributes<HTMLFormElement> {
  userSubscriptionPlan: UserSubscriptionPlan;
}

export function BillingInfo({ userSubscriptionPlan }: BillingInfoProps) {
  console.log("User Subscription Plan:", userSubscriptionPlan); // Debugging statement

  const {
    title,
    description,
    stripeCustomerId,
    isPaid,
    isCanceled,
    stripeCurrentPeriodEnd,
  } = userSubscriptionPlan;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-black dark:text-white">Subscription Plan</CardTitle>
        <CardDescription className="text-black dark:text-white">
          You are currently on the <strong>{title}</strong> plan.
        </CardDescription>
        <UpgradeCard />
      </CardHeader>
      <CardFooter className="flex flex-col items-center space-y-2 border-t bg-accent py-2 md:flex-row md:justify-between md:space-y-0">
        {/* {isPaid ? (
          <p className="text-sm font-medium text-black dark:text-white">
            {isCanceled
              ? "Your plan will be canceled on "
              : "Your plan renews on "}
            {formatDate(stripeCurrentPeriodEnd)}.
          </p>
        ) : null} */}

        {isPaid && stripeCustomerId ? (
          <CustomerPortalButton userStripeId={stripeCustomerId} />
        ) : (
          <Link href="https://qrexperiences.com/pricing" className="btn btn-primary text-white bg-black dark:bg-white dark:text-black py-2 px-4 rounded-full">
            Choose Plan
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
