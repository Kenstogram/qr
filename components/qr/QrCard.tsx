import Image from 'next/image';

type QrCardProps = {
  imageURL?: string;
  time: string;
  clicklink: string;
};

export const QrCard: React.FC<QrCardProps> = ({ imageURL, time, clicklink }) => {
  if (!imageURL) {
    return (
      <div>
        <p>Image URL not provided</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col justify-center items-center gap-y-2 w-[510px] border border-gray-300 rounded shadow group p-2 mx-auto max-w-full">
      <div className="relative">
        <Image
          src={imageURL}
          className="rounded"
          alt="QR Experience"
          width={480}
          height={480}
        />
        <div className="text-xs absolute bottom-0 left-0 right-0 bg-black bg-opacity-20 text-white text-center py-1 px-2">
          go.qrexperiences.com/{clicklink.replace(/^https?:\/\//, '')}
        </div>
      </div>
      <p className="text-gray-400 text-sm italic">
        QR took {time} seconds to generate.
      </p>
    </div>
  );
};
