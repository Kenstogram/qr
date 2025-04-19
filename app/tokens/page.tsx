import Navbar from '@/components/NavbarDark';
import { Suspense } from 'react';
import Iframe from 'react-iframe';
import NavLink from '@/components/NavLink';

export default function TokensPage() {
  return (
    <>
      <Suspense
        fallback={
          <div className="p-2 my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-300" />
        }
      >
        <Navbar />
      </Suspense>
      <div className="p-2 mt-20 mx-auto text-center">
        <div className="mt-36 mb-36 text-center prose mx-auto">
          <h1 className="lg:text-5xl text-3xl font-bold">
            Hardware Security Modules and TokensQR
          </h1>
          <p className="mt-3 text-gray-600">
            Enhance your security infrastructure with Hardware Security Modules (HSM) integrated with TokensQR. Secure sensitive data such as card information and transactions with robust encryption and tokenization techniques.
          </p>
          <p className="mt-3 text-gray-600">
            TokensQR offers a comprehensive platform that leverages HSM capabilities to ensure PCI-DSS compliance and data protection standards. Protect customer data during transactions and engagements, enhancing trust and security in your brand.
          </p>
          <p className="mt-3 text-gray-600">
            Integrate TokensQR with your existing infrastructure to tokenize card data securely, enabling seamless transactions and reducing risks associated with data breaches and unauthorized access.
          </p>
          <div className="mt-10">
            <Iframe
              url="https://hsm.ai/demo"
              width="100%"
              height="850px"
              id="Tokens-iframe"
              className="border-none"
              display="block"
              position="relative"
            />
          </div>
          <NavLink
            href="https://hsm.ai"
            className="block font-medium text-sm text-white bg-black border border-gray-800 hover:bg-gray-600 active:bg-white active:text-black md:inline mt-6"
          >
            Get Started with TokensQR
          </NavLink>
        </div>
      </div>
    </>
  );
}
