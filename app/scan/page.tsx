import Scan from '@/components/scan/scan';
import Navbar from '@/components/NavbarDark';
import { Suspense } from "react";

export default function ScanPage() {
  return (
    <>
          <Suspense fallback={
            <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-300" />
          }>
  <Navbar />
  </Suspense>
  <div className="mt-16 ml-5">
  <Scan />
  </div>
  </> 
  );
}
