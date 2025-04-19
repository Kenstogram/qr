import React from 'react';
import 'swiper/css';
import JoinEmailForm from "../app/app/(auth)/login/JoinEmailForm";
import { Badge } from "@/components/ui/badge"
import Link from "next/link";

export default function Hero() {
  return (
    <section className="absolute top-0 z-0 w-full">
      <div className="pt-40 text-gray-600">
        <div className="space-y-2 max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Link href={`https://app.qrexperiences.com`} className="hover:text-purple-500">
            <Badge variant="outline" className="py-1 px-3 gap-2 border border-stone-50">
              <span className="flex items-center gap-2 text-white">New: QR Analytics Dashboard 2.0 is Live! 🎉</span>
            </Badge>
            </Link>
          </div>
          <h1 className="text-2xl text-white font-extrabold mx-auto sm:text-6xl">
            Ideas to QR Experiences in Seconds.
          </h1>
          <h1 className="text-sm text-stone-50 mx-auto pl-4 pr-4">
            QR Experiences is your Real World QR Analytics Superconnector. Start for Free Today.
          </h1>
          <div className="pb-20 mx-auto text-center">
          <JoinEmailForm/>
          </div>
        </div>
      </div>
    </section>
  );
}