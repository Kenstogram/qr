// /app/api/createHubspotContact.ts (API route)
import axios from "axios";

export async function createHubSpotContact(email: string) {
  const url = 'https://api.hubapi.com/contacts/v1/contact';
  const apiKey = process.env.HUBSPOT_API_KEY; // Store your HubSpot API key securely

  try {
    const response = await axios.post(
      `${url}?hapikey=${apiKey}`,
      {
        properties: [
          { property: 'email', value: email },
        ],
      }
    );

    console.log('HubSpot contact created successfully:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error creating HubSpot contact:', error.response || error);
    throw new Error('Failed to create HubSpot contact');
  }
}
