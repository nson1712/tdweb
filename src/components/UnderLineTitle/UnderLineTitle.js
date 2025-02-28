const UnderLineTitle = ({ title, isH1 }) => {
  return (
    <div className="w-fit pl-2">
      {isH1 ? 
        <h1 className="text-xl font-[600] sm:text-2xl">{title}</h1>
        :
        <h2 className="text-xl font-[600] sm:text-2xl">{title}</h2>
      }
      <span className="mt-[5px] block w-[70%] border-b-[3px] border-red-500"></span>
    </div>
  );
};

export default UnderLineTitle;
