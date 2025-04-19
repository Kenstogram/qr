import { Suspense } from "react";
import Navbar from '@/components/NavbarDark';
import Admin from "@/components/admin";
import PlaceholderCard from "@/components/placeholder-card";

export default function AdminPage() {
  return (
    <>
        <Suspense
        fallback={
          <div className="bg-black grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 200 }).map((_, i) => (
              <PlaceholderCard key={i} />
            ))}
          </div>
        }
      >
        <Navbar />
        <Admin limit={200} />
        </Suspense>
    </>
  );
}
