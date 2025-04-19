import { ReactNode } from "react";
import Nav from "@/components/nav";
import { Suspense } from "react";
import { BottomBar } from "@/components/BottomBar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Nav>
        <Suspense fallback={<div>Loading...</div>}>
        </Suspense>
      </Nav>
      <div className="min-h-screen bg-stone-200 sm:pl-16 pb-96">{children}</div>
        <BottomBar />
    </div>
  );
}