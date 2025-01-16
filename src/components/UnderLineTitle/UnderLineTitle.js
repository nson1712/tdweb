const UnderLineTitle = ({ title }) => {
  return (
    <div className="w-fit pl-2">
      <div className="text-xl font-[600] sm:text-2xl">{title}</div>
      <span className="mt-[5px] block w-[70%] border-b-[3px] border-red-500"></span>
    </div>
  );
};

export default UnderLineTitle;
