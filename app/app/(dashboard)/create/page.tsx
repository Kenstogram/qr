import { getSession } from "@/lib/auth"; // Import getSession
import { redirect } from "next/navigation";
import BodySelector from '@/components/BodySelector';
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function SettingsPage() {
  const session = await getSession();

  // Redirect to login if there is no session
  if (!session) {
    redirect("/login");
  }

  // Check if email is kenny@qrexperiences.com, in which case show Body regardless of siteMatch
  if (session.user.email === "kenny@qrexperiences.com" || session.user.email === "kenny@livestreamqr.com") {
    return <BodySelector />;
  }

  // Fetch the user and check if they have a site match
  const user = await prisma.user.findUnique({
    where: { id: session?.user.id },
    select: {
      siteMatch: true,
    },
  });

  const siteMatch = user?.siteMatch ?? false; // Default to false if siteMatch is not defined

  return (
    <div className="flex flex-col space-y-12 p-4">
      <div className="flex flex-col space-y-6">
        {siteMatch ? (
          // Show upgrade prompt if the user has a siteMatch
          <div className="flex flex-col items-center">
            <Card className="overflow-hidden rounded-lg border bg-card shadow-sm bg-black text-white mr-4">
              <CardHeader className="md:max-xl:px-4">
                <CardTitle>Upgrade</CardTitle>
                <CardDescription className="text-white">
                  Unlock all features and get unlimited access.
                </CardDescription>
              </CardHeader>
              <CardContent className="md:max-xl:px-4">
                <a href="https://qrexperiences.com/pricing">
                  <Button size="sm" className="bg-stone-100 text-black font-bold w-full">
                    Upgrade
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Show the Body component if the user has no siteMatch
          <BodySelector />
        )}
      </div>
    </div>
  );
}
