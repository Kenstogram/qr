"use client";

import { useEffect, useState } from "react";

interface FormSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

interface Props {
  clicklink: string; // Accept clicklink as a prop
}

const FormSubmissions: React.FC<Props> = ({ clicklink }) => {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true); // Reset loading state when fetching
      setError(null); // Reset any previous errors
      try {
        const response = await fetch(`/api/get-form-submissions?clicklink=${clicklink}`);
        if (!response.ok) {
          throw new Error("Failed to fetch form submissions.");
        }
        const data = await response.json();
        setSubmissions(data);
      } catch (error) {
        setError("No form submissions.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (clicklink) {
      fetchSubmissions(); // Fetch submissions based on the clicklink
    }
  }, [clicklink]); // Re-run the effect when the clicklink changes

  if (loading) {
    return <div className="text-center py-4">Loading submissions...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500"></div>;
  }

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Message
            </th>
            <th scope="col" className="px-6 py-3">
              Submitted At
            </th>
          </tr>
        </thead>
        <tbody>
          {submissions.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center">
                No submissions found.
              </td>
            </tr>
          ) : (
            submissions.map((submission) => (
              <tr key={submission.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{submission.name}</td>
                <td className="px-6 py-4">{submission.email}</td>
                <td className="px-6 py-4">{submission.phone}</td>
                <td className="px-6 py-4">{submission.message}</td>
                <td className="px-6 py-4">{new Date(submission.createdAt).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FormSubmissions;
