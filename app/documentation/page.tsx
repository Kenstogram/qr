import Navbar from '@/components/NavbarDark';
import { Suspense } from "react";
import HubSpotForm from '@/components/HubSpotForm'; // Adjust the path as needed
import QRGuide from "../../public/QR-Guide.png";
import QRWatch from "../../public/QR-Watch.png";
import QRSubscribe from "../../public/QR-Subscribe.png";

export default function DocumentationPage() {
  // Array of cards with information and links
  const cards = [
    { title: 'Product Guides and Blog', path: 'https://qrexperiences.com/blog', descriptor: 'Insightful Blog Posts', image: QRWatch },
    { title: 'Customer Support', path: 'https://qrexperiences.com/support', descriptor: 'Were Here to Help', image: QRSubscribe },
    { title: 'API Reference', path: 'https://livestreamapi.vercel.app/', descriptor: 'Developer API Reference', image: QRGuide },
  ];

  return (
    <>
      <Suspense fallback={
        <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-300" />
      }>
        <Navbar />
      </Suspense>

      {/* Cards section */}
      <div className="container mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <div key={index} className="bg-white dark:bg-stone-800 rounded-lg shadow-md p-6 w-80"> {/* Card width set to w-60 */}
            <h2 className="text-xl font-semibold mb-2 text-center">{card.title}</h2>
            <p className="text-gray-600 mb-4 text-center">{card.descriptor}</p>
            <a href={card.path} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mb-4 block text-center">Visit {card.title}</a>

            {/* Image section below the h2 */}
            {card.image && (
              <div className="mt-4 mb-4">
                <img 
                  src={card.image.src} 
                  alt={`QR code for ${card.title}`} 
                  className="w-64 h-auto rounded-lg shadow-lg mx-auto" 
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
