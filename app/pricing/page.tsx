import Navbar from '@/components/Navbar';
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { PricingCards } from "@/components/pricing/pricing-cards";
import { getSession } from "@/lib/auth"; // Import getSession
import SwagCard from "@/components/SwagCard";

export default async function PricingPage() {
  const session = await getSession();

  // Initialize variables for userId and subscriptionPlan
  const stripeCustomerId = session?.user?.stripeCustomerId || null;
  const subscriptionPlan = session?.user?.id
    ? await getUserSubscriptionPlan(session.user.id)
    : null;

  return (
    <>
      <div className="bg-black pb-96">
        <Navbar />
        <div className="flex w-full flex-col py-8 md:py-8 bg-black">
          <PricingCards userId={stripeCustomerId} subscriptionPlan={subscriptionPlan} />
          {/* <ComparePlans /> */}
          <div className="p-8">
          {/* <SwagCard /> */}
          </div>
          {/* <PricingFaq /> */}
        </div>
      </div>
    </>
  );
}
