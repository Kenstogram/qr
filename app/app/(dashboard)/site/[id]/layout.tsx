import { ReactNode } from "react";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex  flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">{children}</div>
    </div>
  );
}
