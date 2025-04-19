import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const qrCodeFaqData = [
  {
    id: "item-1",
    question: "What is a QR?",
    answer:
      "A QR (Quick Response) is a type of matrix barcode that can store information, such as URLs or text, and can be scanned using a smartphone camera.",
  },
  {
    id: "item-2",
    question: "What is a QR Experience?",
    answer:
      "A QR Experience refers to the interactive journey initiated by scanning a QR. It transforms a simple scan into a dynamic interaction, allowing users to access tailored content, engage in surveys, or take advantage of promotions. This experience enhances connectivity and user engagement, providing valuable insights for businesses.",
  },
  {
    id: "item-3",
    question: "How do I scan a QR?",
    answer:
      "To scan a QR, open your smartphone's camera app or a QR reader app. Point the camera at the QR, and a link or information will usually pop up on your screen.",
  },
  {
    id: "item-4",
    question: "What information can be stored in a QR?",
    answer:
      "QRs can store various types of information, including URLs, text, contact information, email addresses, and even Wi-Fi network credentials.",
  },
  {
    id: "item-5",
    question: "Are QRs secure?",
    answer:
      "QRs themselves are not inherently secure, but the information they direct you to can be. Always ensure you're scanning codes from trusted sources to avoid phishing or malicious content.",
  },
  {
    id: "item-6",
    question: "Can I create my own QR?",
    answer:
      "Yes! Create your own QR at QRexperiences.com.",
  },
];

export function PricingFaq() {
  return (
    <div className="bg-black pt-10 pb-40">
        <div className="flex w-full flex-col gap-16 py-8 md:py-8 bg-black">
          <section className="container max-w-4xl py-2">
            <h2 className="text-white text-3xl font-bold text-center">QR Experiences FAQs</h2>
            <Accordion type="single" collapsible className="my-5 w-full">
              {qrCodeFaqData.map((faqItem) => (
                <AccordionItem key={faqItem.id} value={faqItem.id}>
                  <AccordionTrigger className="text-white">
                    {faqItem.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-white sm:text-[15px]">
                    {faqItem.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
      </div>
    </div>
  );
}
