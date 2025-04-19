import LogoutButton from "@/components/logout-button";
import { getSession } from "@/lib/auth"; // Import getSession
import { redirect } from "next/navigation";
import { BillingInfo } from "@/components/pricing/billing-info";
import { getUserSubscriptionPlan } from "@/lib/subscription";

export default async function SettingsPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  let userSubscriptionPlan;
  if (session && session.user.id) {
    userSubscriptionPlan = await getUserSubscriptionPlan(session.user.id);
  } else {
    redirect("/login");
  }

  return (
    <div className="flex flex-col space-y-6 p-8">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-xl font-bold dark:text-white">
          QR Experiences Subscription
        </h1>
        </div>
        <div className="flex flex-col space-y-6">
        {userSubscriptionPlan && <BillingInfo userSubscriptionPlan={userSubscriptionPlan} />}
        </div>
        <div className="flex flex-col space-y-6 items-center">
        <a className="flex flex-col items-center space-y-2 w-36">
          <LogoutButton />
        </a>
        </div>
    </div>
  );
}
