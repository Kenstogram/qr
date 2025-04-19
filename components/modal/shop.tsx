"use client";

import { useState } from "react";
import {QRCodeSVG} from 'qrcode.react';
import { Site } from "@prisma/client";
import { useModal } from "./provider";
import Iframe from 'react-iframe';

export default function ShopModal({ data }: { data: Site }) {
    const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
    const [open, setOpen] = useState(false);
    const modal = useModal();
    const [closeShopModal, setCloseShopModal] = useState(false);
  return (
    <div
      className="h-445 fixed inset-x-0 bottom-5 mx-5 flex  flex-col items-center justify-between space-y-3 rounded-lg border-t-4 border-black bg-white px-5 pb-3 pt-0 drop-shadow-lg transition-all duration-150 ease-in-out dark:border dark:border-t-4 dark:border-stone-700 dark:bg-white dark:text-white lg:flex-row lg:space-y-0 lg:pt-3 xl:mx-auto"
    >
      <button
        onClick={() => setCloseShopModal(!closeShopModal)}
        className={`${
          closeShopModal ? "rotate-180" : "rotate-0"
        } absolute right-3 top-2 text-white transition-all duration-150 ease-in-out dark:text-white`}
      >
      </button>
      <p
        className={`${
          closeShopModal ? "hidden lg:block" : ""
        } mt-2 text-sm text-stone-700 dark:text-stone-300 lg:mt-0`}
      >
      </p>
      <div className="items-center">
      {/* </a> */}
          <Iframe
            url={`https://liveshopqr.com/collections/${data.subdomain}`}
            width="100%"
            height="300"
            id="QRExperiences Donation"
            className="bg-white"
            display="block"
            position="relative"
          />
          </div>
      <div
        className={`${
          closeShopModal ? "hidden lg:flex" : ""
        } flex w-full flex-col space-y-3 text-center sm:flex-row sm:space-x-3 sm:space-y-0 lg:w-auto`}
      >
      </div>
    </div>
  );
}
