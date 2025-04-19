import React from 'react';
import { X } from 'lucide-react';
import Link from "next/link";

interface MenuItem {
  label: string;
  onClick: () => void;
}

interface MenuProps {
  items: MenuItem[];
}

const NavMenu: React.FC<MenuProps> = ({ items }) => {
  return (
    <div className="top-0 left-0 w-full bg-white border-black border border-1 flex items-center rounded-md justify-left z-80">
      <ul className="mt-2 mb-2 ml-4 mr-2 space-y-4">
            <button
                    type="button"
                    className="text-slate-600 dark:text-slate-600 hover:text-gray-800"
                    onClick={() => window.location.href = '/'}
                >
                    <X size={24} />
            </button>
            <div className="grid grid-cols-2">
        <ul className="ml-4 space-y-4">
          {/* <button
            type="button"
            className="bg-gradient-to-r from-orange-600 to-pink-600 hover:bg-gradient-to-r from-cyan-800 to-blue-800 text-white py-2 px-4 border border-slate-800 rounded shadow"
            onClick={() => window.location.href = '/products'}
          >
            Get Started
          </button> */}
          <Link
                href="/products"
                className="group rounded-full px-4 py-2 text-2XL font-semibold transition-all flex items-center justify-center bg-[#ff00d4] text-white no-underline active:scale-95 scale-100 duration-75"
                style={{
                  boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
                }}
              >
                <span className="mr-2 text-white"> Get Started </span>
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.75 6.75L19.25 12L13.75 17.25"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 12H4.75"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
        </ul>
        <ul className=" ml-4 mr-4 space-y-4">
          {/* <button
            type="button"
            className="bg-gradient-to-r from-black to-indigo-600 hover:bg-gradient-to-r from-cyan-800 to-blue-800 text-white py-2 px-4 border border-slate-800 rounded shadow"
            onClick={() => window.location.href = 'https://app.influencersqr.com'}
          >
            Dashboard
          </button> */}
          <Link
                href="https://app.qrexperiences.com"
                className="group rounded-full px-4 py-2 text-2XL font-semibold transition-all flex items-center justify-center bg-[#ff00d4] text-white no-underline active:scale-95 scale-100 duration-75"
                style={{
                  boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
                }}
              >
                <span className="mr-2 text-white"> Dashboard </span>
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.75 6.75L19.25 12L13.75 17.25"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 12H4.75"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
        </ul>
      </div>
        {items.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              item.onClick();
              // Add any logic to close the menu if needed
            }}
            className="text-slate-600 dark:text-slate-600 hover:text-black cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavMenu;
