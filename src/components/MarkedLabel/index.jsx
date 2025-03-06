const MarkedLabel = ({ type, itemDirection }) => {
  return (
    <>
      <div className="absolute top-0 -left-7 -rotate-45 text-white bg-green-500 z-20 pl-6 pr-3 py-0.5 text-xs [clip-path:polygon(40%_0,calc(110%_-_10px)_0,90%_50%,calc(110%_-_10px)_100%,0_100%)]">
        Hoàn
      </div>
      <div
        className="absolute -left-5 top-7 w-5 h-5 bg-green-600 z-6
             [clip-path:polygon(100%_100%,150%_-50%,50%_55%)]"
      ></div>
    </>
  );
};

export default MarkedLabel;
