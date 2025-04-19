"use client";

import { useState } from "react";
import Link from "next/link";
import { UserSubscriptionPlan } from "@/utils/types";
import { SubscriptionPlan } from "@/utils/types";
import { pricingData } from "@/config/subscriptions";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { BillingFormButton } from "@/components/form/billing-form-button";
import { Icons } from "@components/icons";

interface PricingCardsProps {
  userId?: string | null; // Allow null value
  subscriptionPlan?: UserSubscriptionPlan | null; // Allow null value
}

export function PricingCards({ userId, subscriptionPlan }: PricingCardsProps) {
  const isYearlyDefault =
    !subscriptionPlan?.stripeCustomerId || subscriptionPlan?.interval === "year";
  const [isYearly, setIsYearly] = useState<boolean>(!!isYearlyDefault);

  const toggleBilling = () => {
    setIsYearly(!isYearly);
  };

  const PricingCard = ({ offer }: { offer: SubscriptionPlan }) => {
    const isActivePlan = subscriptionPlan?.title === offer.title;

    return (
      <div
        className={cn(
          "relative flex flex-col overflow-hidden rounded-xl border shadow-sm",
          isActivePlan ? "border-2 border-red-400" : "border"
        )}
        key={offer.title}
      >
        <div className="min-h-[150px] items-start space-y-4 bg-muted/50 p-6">
          <p className="flex font-urban text-sm font-bold uppercase tracking-wider text-white">
            {offer.title}
          </p>

          <div className="flex flex-row">
            <div className="flex items-end">
              <div className="flex text-left text-3xl font-semibold leading-6 text-white">
                {isYearly && offer.prices.monthly > 0 ? (
                  <>
                    <span className="mr-2 text-white/80 line-through">
                      ${offer.prices.monthly}
                    </span>
                    <span className="mr-2 text-black">${(offer.prices.yearly / 12).toFixed(2)}</span>
                  </>
                ) : (
                  `$${offer.prices.monthly}`
                )}
              </div>
              <div className="-mb-1 ml-2 text-left text-sm font-medium text-white">
                <div>/month</div>
              </div>
            </div>
          </div>
          {offer.prices.monthly > 0 ? (
            <div className="text-left text-sm text-white">
              {isYearly
                ? `$${offer.prices.yearly} will be charged when annual`
                : "when charged monthly"}
            </div>
          ) : null}
        </div>

        <div className="flex h-full flex-col justify-between gap-16 p-6">
          <ul className="space-y-2 text-left text-sm font-medium leading-normal text-white">
            {offer.benefits.map((feature) => (
              <li className="flex items-start gap-x-3" key={feature}>
                <Icons.check className="size-5 shrink-0 text-red-500" />
                <p>{feature}</p>
              </li>
            ))}

            {offer.limitations.length > 0 &&
              offer.limitations.map((feature) => (
                <li className="flex items-start text-white" key={feature}>
                  <Icons.zap className="mr-3 size-5 shrink-0" />
                  <p>{feature}</p>
                </li>
              ))}
          </ul>

          {userId && subscriptionPlan ? (
            offer.title === "Starter" ? (
              <Link
                href="https://app.qrexperiences.com"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Go to Dashboard
              </Link>
            ) : (
              <BillingFormButton
                year={isYearly}
                offer={offer}
                subscriptionPlan={subscriptionPlan}
              />
            )
          ) : (
            <Button
              variant={
                offer.title.toLocaleLowerCase() === "pro"
                  ? "default"
                  : "outline"
              }
              onClick={() => {
                if (!userId) {
                  // Handle null userId case here
                  console.log("User is not logged in");
                  // Redirect can be handled elsewhere if needed
                } else {
                  // Your logic for logged-in users
                }
              }}
            >
              {userId ? "Manage Subscription" : "Sign in"}
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="flex flex-col items-center text-center text-white">
      <div className="mt-20 mb-4 mt-10 flex items-center gap-5">
        <div className="text-white text-center text-3xl font-bold">
          <h1 className="text-3xl font-bold text-white">Pricing</h1>
          <p className="text-lg text-white">Choose a plan that works best for you</p>
        </div>
      </div>
      <ToggleGroup
        type="single"
        size="sm"
        defaultValue={isYearly ? "yearly" : "monthly"}
        onValueChange={toggleBilling}
        aria-label="toggle-year"
        className="h-9 overflow-hidden rounded-full border bg-background p-1 *:h-7"
      >
        <ToggleGroupItem
          value="monthly"
          className="rounded-full px-5 data-[state=on]:!bg-gradient-to-r data-[state=on]:!from-red-500 data-[state=on]:!to-purple-600 text-black"
          aria-label="Toggle monthly billing"
        >
          Monthly
        </ToggleGroupItem>
        <ToggleGroupItem
          value="yearly"
          className="rounded-full px-5 data-[state=on]:!bg-gradient-to-r data-[state=on]:!from-red-500 data-[state=on]:!to-purple-600 text-black"
          aria-label="Toggle yearly billing"
        >
          Yearly (-20%)
        </ToggleGroupItem>
      </ToggleGroup>

      <div className="grid gap-5 bg-inherit py-5 lg:grid-cols-3">
        {pricingData.map((offer) => (
          <PricingCard offer={offer} key={offer.title} />
        ))}
      </div>

      <p className="mt-3 text-balance text-center text-base text-white mb-2">
        Need more clicks? Want something new? Reach out for Enterprise solutions!
        </p>
        <a         href={"/support"}>
      <Button
        variant={"outline"}
        aria-label="Get in touch for enterprise QR solutions"
      >
        Contact
      </Button>
      </a>
      {/* <p className="mt-3 text-balance text-center text-base text-white">
        Email{" "}
        <a
          className="font-medium text-blue-600 hover:underline"
          href="mailto:kenny@qrexperiences.com"
        >
          kenny@qrexperiences.com
        </a>{" "}
        to contact our support team.
        <br />
      </p> */}
    </section>
  );
}
