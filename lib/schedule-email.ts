import { Resend } from 'resend';
import { createHubSpotContact } from "./createHubspotContact"

export async function scheduleFollowUpEmail(createdAt: Date, email: string) {
  const now = new Date();
  
  // Calculate the time for scheduling the email (e.g., 1 minute from now)
  const delay = createdAt.getTime() + 60 * 1000 - now.getTime(); // 1 minute delay in milliseconds
  
  if (delay > 0) {
    const resend = new Resend(process.env.RESEND_API_KEY!);

    // Calculate the scheduled time for the email (in ISO format)
    const scheduledAt = new Date(now.getTime() + delay).toISOString();
    createHubSpotContact(email);

    try {
      // Send the email via Resend, scheduling it for later
      await resend.emails.send({
        from: 'kenny@qrexperiences.com',
        to: email,
        subject: 'Welcome to QR Experiences!',
        html: `
          <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f9f9f9;
                }
                .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                h2 {
                  color: #333;
                  font-size: 24px;
                  text-align: center;
                  margin-bottom: 20px;
                }
                p {
                  color: #555;
                  line-height: 1.6;
                  font-size: 16px;
                }
                .button {
                  display: inline-block;
                  background-color: #6b7280;
                  color: #ffffff;
                  padding: 12px 25px;
                  text-decoration: none;
                  font-weight: bold;
                  text-align: center;
                  border-radius: 5px;
                  margin-top: 20px;
                  transition: background-color 0.3s ease;
                }
                .button:hover {
                  background-color: #333;
                }
                .footer {
                  text-align: center;
                  font-size: 12px;
                  color: #777;
                  margin-top: 30px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h2>Welcome to QR Experiences!</h2>
                <p>Hi there,</p>
                <p>I'm Kenny, Founder of QR Experiences. We just wanted to follow up with you and make sure you're getting the most out of QR Experiences. We're excited to have you on board!</p>
                <p>If you have any questions or need assistance, feel free to reach out to us anytime. We're here to help!</p>
                <p>Best regards,</p>
                <p>The QR Experiences Team</p>

                <!-- Button to the waitlist page -->
                <a href="https://qrexperiences.com/waitlist" class="button">
                  Contact Us
                </a>

                <p class="footer">Need support, <a href="https://qrexperiences.com/waitlist" style="color: #333;">reach out!</a>.</p>
              </div>
            </body>
          </html>
        `,
        scheduledAt: scheduledAt, // Scheduling the email at the calculated time
      });
      console.log(`Follow-up email scheduled to be sent to ${email} at ${scheduledAt}`);
    } catch (error) {
      console.error("Error sending follow-up email:", error);
    }
  } else {
    console.log("CreatedAt timestamp is more than a minute ago. Skipping follow-up email.");
  }
}
