import Image from "next/image";
import imageLoader from "../../loader/imageLoader";

const CategoryItem = ({ thumbnail, name, handleItemClick }) => {
  return (
    <div
      className="text-xs sm:text-sm cursor-pointer hover:translate-y-[-5%] transition delay-75"
      onClick={handleItemClick}
    >
      {thumbnail ? (
        <Image
          loader={imageLoader}
          className="rounded-xl self-center"
          width={130}
          height={60}
          src={thumbnail}
          alt={name}
          title={name}
        />
      ) : null}
      <div className="font-semibold self-center">{name}</div>
    </div>
  );
};

export default CategoryItem;
