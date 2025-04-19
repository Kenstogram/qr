import Navbar from '@/components/NavbarDark';
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { PricingFaq } from "@/components/pricing/pricing-faq";
import { getSession } from "@/lib/auth"; // Import getSession

export default async function PricingPage() {
  const session = await getSession();

  // Initialize variables for userId and subscriptionPlan
  const stripeCustomerId = session?.user?.stripeCustomerId || null;
  const subscriptionPlan = session?.user?.id
    ? await getUserSubscriptionPlan(session.user.id)
    : null;

  return (
    <>
      <div className="bg-black">
        <Navbar />
        <div className="flex w-full flex-col gap-16 py-8 md:py-8 bg-black mt-20">
          <PricingFaq />
        </div>
      </div>
    </>
  );
}
