import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function UpgradeCard() {
  return (
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
  );
}
