"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import LoadingDots from '@/components/icons/loading-dots';
import { createReferral, createDiscount, addRegionsToDiscount, createAffiliateDiscount } from '@/actions/product-requests'; // Import the necessary actions

export default function CreateSubscriptionModal() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const customerId = await createReferral(email);
      const discountId = await createDiscount(email);
      const commission = await createDiscount(email);
      await addRegionsToDiscount(discountId);
      await createAffiliateDiscount(customerId, discountId, commission); // Pass referralPercentage to the createAffiliateDiscount function

      toast.success(`Successfully created Brand Ambassador with email: ${email}`);
    } catch (error) {
      console.error('Error creating Brand Ambassador:', error);
      toast.error('Failed to create Brand Ambassador. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full rounded-md bg-white dark:bg-white md:max-w-md md:border md:border-stone-200 md:shadow dark:md:border-stone-700">
      <div className="relative flex flex-col space-y-4 p-5 md:p-10">
        <h2 className="font-cal text-2xl dark:text-black">Invite Subscriber</h2>
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-stone-500 dark:text-stone-400">Subscriber Email</label>
          <input
            name="email"
            type="email"
            placeholder="subscriber@influencersqr.com"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={255}
            required
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-white dark:bg-white dark:text-black dark:placeholder-stone-300 dark:focus:ring-white"
          />
        </div>
      </div>
      <div className="flex items-center justify-end rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-300 md:px-10">
        <CreateSubscriptionFormButton loading={loading} />
      </div>
    </form>
  );
}

interface CreateSubscriptionFormButtonProps {
  loading: boolean;
}

function CreateSubscriptionFormButton({ loading }: CreateSubscriptionFormButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`flex h-10 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none ${loading ? 'border-gray-300 bg-gray-300 text-gray-600' : 'border-black bg-white text-black hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-white dark:text-black dark:hover:text-black dark:active:bg-stone-300'}`}
    >
      {loading ? <LoadingDots color="#808080" /> : null}
      <p>{loading ? 'Creating Subscription Invite...' : 'Create Subscription Invite'}</p>
    </button>
  );
}
