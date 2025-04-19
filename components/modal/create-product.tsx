"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import LoadingDots from '@/components/icons/loading-dots';
import { productRequest } from '@/actions/product-requests';

export default function CreateProductModal() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await productRequest(title, description, thumbnail);
  
      if (response) {
        toast.success('Product created successfully');
        // Reload the page after creating the product
        window.location.reload();
      } else {
        toast.error('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Failed to create product. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full rounded-md bg-white dark:bg-white md:max-w-md md:border md:border-stone-200 md:shadow dark:md:border-stone-700">
      <div className="relative flex flex-col space-y-4 p-5 md:p-10">
        <h2 className="font-cal text-2xl dark:text-black">Create Product</h2>
        <div className="flex flex-col space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-stone-500 dark:text-stone-400">Product Title</label>
          <input
            name="title"
            type="text"
            placeholder="Product Title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={255}
            required
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-white dark:bg-white dark:text-black dark:placeholder-stone-300 dark:focus:ring-white"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="description" className="text-sm font-medium text-stone-500 dark:text-stone-400">Product Description</label>
          <textarea
            name="description"
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            required
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-white dark:bg-white dark:text-black dark:placeholder-stone-300 dark:focus:ring-white"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="thumbnail" className="text-sm font-medium text-stone-500">Product Image URL</label>
          <input
            name="thumbnail"
            type="text"
            placeholder="Enter the URL of the image"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-white dark:bg-white dark:text-black dark:placeholder-stone-300 dark:focus:ring-white"
          />
        </div>
      </div>
      <div className="flex items-center justify-end rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-300 md:px-10">
        <CreateProductFormButton loading={loading} title={title} description={description} thumbnail={thumbnail} />
      </div>
    </form>
  );
}

interface CreateProductFormButtonProps {
  loading: boolean;
  title: string;
  description: string;
  thumbnail: string; // Add thumbnail property
}

function CreateProductFormButton({ loading }: CreateProductFormButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`flex h-10 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none ${loading ? 'border-gray-300 bg-gray-300 text-gray-600' : 'border-black bg-white text-black hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-white dark:text-black dark:hover:text-black dark:active:bg-stone-300'}`}
    >
      {loading ? <LoadingDots color="#808080" /> : null}
      <p>{loading ? 'Creating Product...' : 'Create Product'}</p>
    </button>
  );
}
