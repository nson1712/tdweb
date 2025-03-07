
const MarkedLabel = ({ type, itemDirection }) => {
  return (
    <>
      <div className="absolute top-0 -left-5 -rotate-45 text-white font-bold bg-green-500 z-20 pl-5 pr-3 text-[10px] [clip-path:polygon(40%_0,calc(110%_-_10px)_0,90%_50%,calc(110%_-_10px)_100%,0_100%)]">
        Hoàn
      </div>
      <div
        className="absolute -left-4 top-5 w-5 h-5 bg-green-600 z-6
             [clip-path:polygon(100%_100%,150%_-50%,50%_55%)]"
      ></div>
    </>
  );
};

export default MarkedLabel;
