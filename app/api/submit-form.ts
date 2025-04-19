import prisma from "@/lib/prisma"; // assuming you have a prisma client setup
import { NextApiRequest, NextApiResponse } from "next";

const submitForm = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { siteId, name, email, phone, message } = req.body;

    try {
      const newSubmission = await prisma.siteFormSubmission.create({
        data: {
          siteId,
          name,
          email,
          phone,
          message,
        },
      });
      return res.status(200).json({ message: "Form submitted successfully", data: newSubmission });
    } catch (error) {
      console.error("Error saving form submission:", error);
      return res.status(500).json({ message: "Error submitting the form" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
};

export default submitForm;
