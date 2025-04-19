"use client";

import { useState } from "react";

interface FormData {
  siteId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface Props {
  siteId: string;
  color: string; // Accept color as a prop
}

const SiteForm: React.FC<Props> = ({ siteId, color }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    siteId: siteId, // Initialize siteId with the passed prop
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Pass the whole formData object which includes siteId
      });

      if (response.ok) {
        setSuccess("Form submitted successfully!");
        setFormData({
          siteId, // Reset siteId after submission
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        const data = await response.json();
        setError(data.error || "Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>

      <div className="space-y-4">
        {/* Name Input */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-lg font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email Input */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-lg font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone Input */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-lg font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            pattern="^[0-9]{10}$" // Validates a 10-digit phone number format
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Message Input */}
        <div className="flex flex-col">
          <label htmlFor="message" className="text-lg font-medium text-gray-700">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`mt-4 py-2 px-4 ${loading ? "bg-gray-400" : `bg-black`} text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-grey-500`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          {/* Error Message */}
          {error && <div className="text-red-600 mb-4">{error}</div>}
            {/* Success Message */}
            {success && <div className="text-green-600 mb-4">{success}</div>}
        </div>
      </div>
    </form>
  );
};

export default SiteForm;
