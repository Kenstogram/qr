"use client";

import { useState } from "react";
import { QrCode } from "lucide-react";
import {QRCodeSVG} from 'qrcode.react';
import { Site } from "@prisma/client";
import { useModal } from "./provider";

export default function QrModal({ data }: { data: Site }) {
    const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
    const [open, setOpen] = useState(false);
    const modal = useModal();
    const [closeQrModal, setCloseQrModal] = useState(false);
  return (
    <div
      className="h-445 fixed inset-x-0 bottom-5 mx-5 flex  flex-col items-center justify-between space-y-3 rounded-lg border-t-4 border-black bg-white px-5 pb-3 pt-0 drop-shadow-lg transition-all duration-150 ease-in-out dark:border dark:border-t-4 dark:border-stone-700 dark:bg-white dark:text-white lg:flex-row lg:space-y-0 lg:pt-3 xl:mx-auto"
    >
      <button
        onClick={() => setCloseQrModal(!closeQrModal)}
        className={`${
          closeQrModal ? "rotate-180" : "rotate-0"
        } absolute right-3 top-2 text-white transition-all duration-150 ease-in-out dark:text-white`}
      >
      </button>
      <p
        className={`${
          closeQrModal ? "hidden lg:block" : ""
        } mt-2 text-sm text-stone-700 dark:text-stone-300 lg:mt-0`}
      >
      </p>
        <a
          href={
            process.env.NEXT_PUBLIC_VERCEL_ENV
              ? `https://go.qrexperiences.com/${data.subdomain}`
              : `http://${data.subdomain}.localhost:3000`
          }
          target="_blank"
          rel="noreferrer"
          className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-300 dark:text-stone-400 dark:hover:bg-stone-700"
        >
          {`go.qrexperiences.com/${data.subdomain}`} ↗
        </a>
      <div className="items-center">
         <div className="flex items-center rounded-lg justify-between px-1 py-1 bg-gradient-to-r from-amber-400 to-red-400">
            <QRCodeSVG
              value={`https://go.qrexperiences.com/${data.subdomain}`}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"L"}
              height={150}
              width={150}
              />
          </div>
          </div>
      <div
        className={`${
          closeQrModal ? "hidden lg:flex" : ""
        } flex w-full flex-col space-y-3 text-center sm:flex-row sm:space-x-3 sm:space-y-0 lg:w-auto`}
      >
      </div>
    </div>
  );
}
