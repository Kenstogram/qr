import QRStyler from '@/components/QRStyler';

const Style = () => {
  return (
    <div className="flex justify-center items-center flex-col w-full lg:p-0 p-4 sm:mb-28 mb-0">
      <div className="mt-4 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mt-10">
        <div className="flex flex-col items-center bg-white pb-2">
          <QRStyler />
        </div>
      </div>
    </div>
  );
};

export default Style;
