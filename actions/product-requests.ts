
"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import axios from 'axios';

export const productArchive = async (id: string) => {
    try {
      const response = await axios.post(
        `https://InfluencersQR.cloud/admin/products/${id}`,
        {
          status: "draft", 
        },
        {
          headers: {
            'x-medusa-access-token': `${process.env.MEDUSA_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.data && response.data.success) {
        console.log('Product archived successfully');
        return response;
      } else {
        console.error('Failed to archive product');
        return null;
      }
    } catch (error) {
      console.error('An error occurred:', error);
      return null;
    }
  };
   
  export const productRequest = async (title: string, description: string, thumbnail: string) => {
    try {
      // Send product request to create a new product
      const productResponse = await axios.post(
        'https://InfluencersQR.cloud/admin/products',
        {
          title,
          description,
          subtitle: null,
          status: "published", 
          handle: title.toLowerCase().replace(/\s+/g, '-'),
          is_giftcard: false,
          discountable: true,
          thumbnail,
        },
        {
          headers: {
            'x-medusa-access-token': `${process.env.MEDUSA_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (!productResponse.data || !productResponse.data.success) {
        console.error('Failed to send Product request');
        return null;
      }
  
      console.log('Product request sent successfully');
      
      // Extract the product ID from the response
      const productId = productResponse.data.id;
  
      const variantResponse = await axios.post(
        `https://InfluencersQR.cloud/admin/products/${productId}/variants`,
        {
          "title": "Color",
          "prices": [
            {
              "amount": 1000,
              "currency_code": "usd"
            }
          ]
        },
        {
          headers: {
            'x-medusa-access-token': `${process.env.MEDUSA_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (!variantResponse.data || !variantResponse.data.success) {
        console.error('Failed to add variants to the product');
        return null;
      }
  
      console.log('Variants added successfully');
  
      return productResponse; // Return the product response if needed
    } catch (error) {
      console.error('An error occurred:', error);
      return null;
    }
  };
  
  
export const updateProduct = async (id: string) => {
  try {
    const response = await axios.post(
      `https://InfluencersQR.cloud/admin/products/${id}`,
      {
        status: "draft", 
      },
      {
        headers: {
          'x-medusa-access-token': `${process.env.MEDUSA_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data && response.data.success) {
      console.log('Product archived successfully');
      return response;
    } else {
      console.error('Failed to archive product');
      return null;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
};

export const GetOrders = async () => {
  try {
    const response = await axios.get(
      'https://influencersqr.cloud/admin/orders',
      {
        headers: {
          Authorization: `Bearer ${process.env.MEDUSA_API_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'x-medusa-access-token': `${process.env.MEDUSA_API_TOKEN}`,
          'Cookie': 'connect.sid=s%3AjGG95pVHoMbkOlSf36DMAvwE5SeGSaN6.jCoWrfASZ0KApFdX7G1%2BUnpM2W1lWm6%2Fd2tfpuQIXn4'
        }
      }
    );
    console.log('Orders:', response.data); // Log the entire response
    return response.data; // Return the entire response
  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
};

export const fetchDiscounts = async () => {
  try {
      const response = await axios.get("https://influencersqr.cloud/admin/discounts", {
          headers: {
              "Content-Type": "application/json",
              'x-medusa-access-token': `${process.env.MEDUSA_API_TOKEN}`,
              Authorization: `Bearer ${process.env.MEDUSA_API_TOKEN}`,
            },
      });
      return response.data;
  } catch (error) {
      console.error("Error fetching discounts:", error);
      throw new Error("Failed to fetch discounts. Please try again later.");
  }
};

export const createAdmin = async (
  formData: FormData,
  _id: unknown,
  key: string,
) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const value = formData.get(key) as string;

  try {
    const response = await prisma.user.update({
      where: {
        id: session.user.id, // Use the authenticated user's ID
      },
      data: {
        [key]: value,
      },
    });

    // Send admin request
    await AdminRequest(session.user.email, session.user.stripeId as string);

    // User Token Request
    const jwtToken = await JWTRequest(session.user.email, session.user.stripeId as string);

    // /admin/store Update Store Details
    await StoreRequest(session.user.email, jwtToken);

    return response;
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        error: `This ${key} is already in use`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};

const AdminRequest = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      'https://InfluencersQR.cloud/admin/users',
      {
        email: email as string,
        password: password as string,
        // Uncomment below for Role Admin otherwise Member by default
        // role: 'admin',
      },
      {
        headers: {
          'x-medusa-access-token': `${process.env.MEDUSA_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.data && response.data.success) {
      console.log('Admin request sent successfully');
    } else {
      console.error('Failed to send admin request');
    }

    // Send admin invite
    // await axios.post(
    //   'https://InfluencersQR.cloud/admin/invites',
    //   {
    //     user: email as string,
    //   },
    //   {
    //     headers: {
    //       'x-medusa-access-token': 'YOUR_ACCESS_TOKEN',
    //       'Content-Type': 'application/json',
    //     },
    //   }
    // );
    // console.log('Admin invite sent successfully');
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

const JWTRequest = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      'https://InfluencersQR.cloud/admin/auth/token',
      {
        email: email as string,
        password: password as string,
      },
      {
        headers: {
          'x-medusa-access-token': `${process.env.MEDUSA_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Store token created successfully');
    return response.data.access_token; // Return the obtained JWT token
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

const StoreRequest = async (email: string, jwtToken: string) => {
  try {
    const response = await axios.post(
      'https://InfluencersQR.cloud/admin/store',
      {
        "name": "InfluencersQR Store",
      },
      {
        headers: {
          'x-medusa-access-token': jwtToken,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Store name updated successfully');
  } catch (error) {
    console.error('An error occurred:', error);
  }
};


export const GetProducts = async () => {
try {
  const response = await axios.get(
    'https://influencersqr.cloud/store/products',
    {
      headers: {
        Authorization: `Bearer ${process.env.MEDUSA_API_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': 'connect.sid=s%3A_xmyFYxShOeoQng3KQz_ozCVf54ZCTmK.rVen9Frd%2BzBnRM6upJJT56wNUP0AqDPcFkRvMCQgEsc'
      }
    }
  );
  console.log('Products:', response.data.products); // Log only the products array
  return response.data.products; // Return the products array directly
} catch (error) {
  console.error('An error occurred:', error);
  return null;
}
};

export const createDiscount = async (email: string) => {
  try {
      const apiUrl = "https://influencersqr.cloud/admin/discounts";
      const response = await axios.post(
          apiUrl,
          {
              code: email,
              rule: {
                  type: "fixed",
                  value: 10,
                  allocation: "item"
              },
              regions: ["reg_01HSD1NTBMP18RCVZXG6WXY1RG"] // Add regions array here
          },
          {
              headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  'x-medusa-access-token': `${process.env.MEDUSA_API_TOKEN}`,
                  Authorization: `Bearer ${process.env.MEDUSA_API_TOKEN}`,
              },
          }
      );

      // Extract discountId from the discount creation response
      const discountId = response.data.discount.id;
      console.log("Discount created. Discount ID:", discountId);

      return discountId;
  } catch (error: any) {
      console.error("Error creating discount:", error);
      throw new Error("Failed to create discount. Please try again later.");
  }
};

export const addRegionsToDiscount = async (discountId: string) => {
    try {
        const apiUrl = `https://influencersqr.cloud/admin/discounts/${discountId}/regions/reg_01HSD1NTBMP18RCVZXG6WXY1RG`;

        const response = await axios.post(
            apiUrl,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    'x-medusa-access-token': `${process.env.MEDUSA_API_TOKEN}`,
                    Authorization: `Bearer ${process.env.MEDUSA_API_TOKEN}`,
                  },
            }
        );

        return response.data;
    } catch (error: any) {
        console.error("Error adding regions to discount:", error);
        throw new Error("Failed to add regions to discount. Please try again later.");
    }
};

export const createReferral = async (email: string) => {
  try {
      console.log("Creating referral for email:", email);

      // Create customer
      const apiUrl = "https://influencersqr.cloud/store/customers";
      const response = await axios.post(
          apiUrl,
          { email, password: "supersecret123!" },
          {
              headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${process.env.MEDUSA_API_TOKEN}`,
                },
          }
      );

      const customerId = response.data.id;
      console.log("Referral created. Customer ID:", customerId);

      // Create discount
      const discountId = await createDiscount(email);
      console.log("Discount created. Discount ID:", discountId);

      // Add regions to the discount
      const regions = await addRegionsToDiscount(discountId);
      console.log("Region Added to Discount", regions);

      // Create commission
      const commission = await createDiscount(email);
      console.log("Commission created. Commission ID:", commission);
      // Create affiliate discount using the customerId and discountId
      const affiliate = await createAffiliateDiscount(customerId, discountId, commission);

      console.log("Affiliate discount created successfully.", affiliate);

      return response.data;
  } catch (error: any) {
      console.error(`Error creating Brand Ambassador: ${error.message}`);
      throw new Error(`Error creating Brand Ambassador: ${error.message}`);
  }
};

export const createAffiliateDiscount = async (customerId: string, discountId: string, commission: string) => {
  try {
    const apiUrl = "https://influencersqr.cloud/admin/affiliate-discount";
    const requestData = {
      customerId,
      discountId,
      commission,
    };
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      'x-medusa-access-token': `${process.env.MEDUSA_API_TOKEN}`,
      Authorization: `Bearer ${process.env.MEDUSA_API_TOKEN}`,
    };

    const response = await axios.post(apiUrl, requestData, { headers });

    console.log("Affiliate discount created successfully:", response.data);

    return response.data;
  } catch (error: any) {
    console.error("Error creating affiliate discount:", error);

    if (error.response) {
      console.error("Response data:", error.response.data);
      throw new Error(`Failed to create affiliate discount. Error: ${error.response.data}`);
    } else {
      throw new Error("Failed to create affiliate discount. Please try again later.");
    }
  }
};

