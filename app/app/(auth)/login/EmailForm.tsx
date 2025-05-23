'use client'

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function EmailForm() {
  const [showEmailOption, setShowEmailOption] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  // State to track loading status

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setLoading(true); // Start loading
        signIn("email", {
          email,
          redirect: false,
        }).then((res) => {
          setLoading(false); // Stop loading when done
          if (res?.ok && !res?.error) {
            setEmail("");
            setMessage("Email sent - check your inbox!");
          } else {
            setError("Error sending email - try again?");
          }
        });
      }}
      className="flex flex-col space-y-3"
    >
      {showEmailOption && (
        <div>
          <input
            id="email"
            name="email"
            autoFocus={true}
            type="email"
            placeholder="kenny@qrexperiences.com"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm text-black"
          />
        </div>
      )}
      
      <button
        className="h-10 w-full items-center justify-center space-x-2 rounded-md border px-4 text-sm transition-all focus:outline-none border-gray hover:border-black bg-gradient-to-r from-stone-100 to-stone-100 text-black"
        type="submit"
        disabled={loading} // Disable button while loading
        {...(!showEmailOption && {
          type: "button",
          onClick: (e) => {
            e.preventDefault();
            setShowEmailOption(true);
          },
        })}
      >
        {loading ? 'Sending...' : 'Login by Email'}  {/* Button text changes while loading */}
      </button>

      {error && (<p className="text-center text-sm text-red-500">{error}</p>)}
      {message && (<p className="text-center text-sm text-green-500">{message}</p>)}
    </form>
  )
}
