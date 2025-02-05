import Image from "next/image";

const CategoryItem = ({ thumbnail, name, handleItemClick }) => {
  return (
    <div
      className="text-xs sm:text-sm cursor-pointer hover:translate-y-[-5%] transition delay-75"
      onClick={handleItemClick}
    >
      <Image
        className="rounded-xl self-center"
        width={130}
        height={60}
        src={thumbnail}
        alt="Thể loại"
      />
      <div className="font-semibold self-center">{name}</div>
    </div>
  );
};

export default CategoryItem;
