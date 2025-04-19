'use client'

import { useState } from "react";
import { signIn } from "next-auth/react";
import { ArrowRight } from 'lucide-react';

export default function JoinEmailForm() {
  const [showEmailOption, setShowEmailOption] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await signIn("email", {
        email,
        redirect: false,
      });
      if (res?.ok && !res?.error) {
        setEmail("");
        setMessage("Email sent - check your inbox!");
      } else {
        setError("Error sending email - try again?");
      }
    } catch (err) {
      setError("Unexpected error occurred.");
    }
  };

  return (
    <>
    <form
      onSubmit={handleSubmit}
      className="items-center flex justify-center flex-col gap-2"
    >
      {showEmailOption && (
        <div>
          <input
            id="email"
            name="email"
            autoFocus
            type="email"
            placeholder="kenny@qrexperiences.com"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-60 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm text-black"
          />
        </div>
      )}

      {/* <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setShowEmailOption(true);
        }}
        className="h-10 w-60 flex items-center justify-center space-x-2 rounded-md border px-4 text-sm transition-all focus:outline-none border-gray hover:border-black bg-black text-white shadow-md hover:shadow-lg mx-auto"
      >
        Create a Free QR
        <ArrowRight className="ml-2" />
      </button> */}
      <a
        href="https://go.qrexperiences.com/app"
        target="_blank"
        rel="noopener noreferrer"
        className="h-10 w-60 flex items-center justify-center space-x-2 rounded-md border px-4 text-sm transition-all focus:outline-none border-gray hover:border-black bg-black text-white shadow-md hover:shadow-lg mx-auto"
      >
        Create a Free QR
        <ArrowRight className="ml-2" />
      </a>
      <a
        href="https://qrexperiences.com/support"
        target="_blank"
        rel="noopener noreferrer"
        className="h-10 w-60 flex items-center justify-center space-x-2 rounded-md border px-4 text-sm transition-all focus:outline-none border-black hover:border-gray-300 bg-white text-black shadow-md hover:shadow-lg mx-auto"
      >
        Contact Us
      </a>

      {error && <p className="text-center text-sm text-red-500">{error}</p>}
      {message && <p className="text-center text-sm text-green-500">{message}</p>}
    </form>
    </>
  );
}
