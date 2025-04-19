import Image from "next/image";

export default function NotFoundSite() {
  return (
    <div className="mt-20 flex flex-col items-center space-x-4">
      <h1 className="font-cal text-4xl dark:text-black">404</h1>
      <Image
        alt="missing site"
        src="https://illustrations.popsy.co/pink/cute-smiling-cat.svg"
        width={400}
        height={400}
        className="dark:hidden"
      />
      <Image
        alt="missing site"
        src="https://illustrations.popsy.co/pink/cute-smiling-cat.svg"
        width={400}
        height={400}
        className="hidden dark:block"
      />
      <p className="text-lg text-stone-500 dark:text-stone-400">
        QR does not exist, or you do not have permission to view it
      </p>
    </div>
  );
}
