const CategoriesTag = ({ title, className }) => {
  return (
    <div
      className={`bg-[#DF062D] text-white font-semibold w-fit py-1 px-3 rounded-md ${className}`}
    >
      {title}
    </div>
  );
};

export default CategoriesTag;
