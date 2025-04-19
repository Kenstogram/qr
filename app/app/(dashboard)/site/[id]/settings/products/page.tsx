import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Form from "@/components/form";
import { updateSite } from "@/lib/actions";
import ProductsMockup from "@/components/products";
import ProductsDataMockup from "@/components/productsdata";
import CreateProductsButton from "@/components/create-product-button";
import CreateProductsModal from "@/components/modal/create-product";

export default async function SiteSettingsProducts({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.site.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <>
    <div className="flex items-center justify-center sm:justify-start">
    <div className="flex flex-col items-center space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
      <h1 className="font-cal text-xl font-bold dark:text-black sm:text-3xl">
        Products for {data.name}
      </h1>
      <a
            href={`https://go.qrexperiences.com/${data.subdomain}`}
            target="_blank"
            rel="noreferrer"
            className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-black transition-colors hover:bg-stone-200 dark:bg-stone-300 dark:hover:bg-stone-700"
          >
            {`go.qrexperiences.com/${data.subdomain}`} ↗
          </a>
      <CreateProductsButton>
         <CreateProductsModal />
      </CreateProductsButton>
      {/* <Form
        title="Custom Domain"
        description="The custom domain for your site."
        helpText="Please enter a valid domain."
        inputAttrs={{
          name: "customDomain",
          type: "text",
          defaultValue: data?.customDomain!,
          placeholder: "yourdomain.com",
          maxLength: 64,
          pattern: "^[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}$",
        }}
        handleSubmit={updateSite}
      /> */}
        </div>
      </div>
      <ProductsMockup />   
      <ProductsDataMockup />     
      {/* <Form
        title="Domain"
        description="The domain for your stream."
        helpText="Please use 32 characters maximum."
        inputAttrs={{
          name: "subdomain",
          type: "text",
          defaultValue: data?.subdomain!,
          placeholder: "subdomain",
          maxLength: 32,
        }}
        handleSubmit={updateSite}
      /> */}
      </>
  );
}
