


"use server";

import axios from 'axios';

export const GetSubscriptions = async () => {
    try {
      const response = await axios.get(
        'https://api.stripe.com/v1/subscriptions',
        {
          headers: {
            Authorization: `Bearer ${process.env.STRIPE_API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': 'cid=5cb13a12-b6da-4a26-8a54-ab44e9141233'
          }
        }
      );
      console.log('Subscriptions:', response.data.data); // Log only the subscriptions data
      return response.data.data; // Return the subscriptions data directly
    } catch (error) {
      console.error('An error occurred:', error);
      return null;
    }
  };
    
  
  export const updateSubscriptions = async (id: string) => {
    try {
      const response = await axios.post(
        `https://api.stripe.com/v1/subscriptions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.STRIPE_API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': 'cid=5cb13a12-b6da-4a26-8a54-ab44e9141233'
          }
        }
      );
      console.log('Subscriptions:', response.data.data); // Log only the subscriptions data
      return response.data.data; // Return the subscriptions data directly
    } catch (error) {
      console.error('An error occurred:', error);
      return null;
    }
  };
  