import Image from "next/image";
import imageLoader from "../../loader/imageLoader";
import Link from "next/link";

const CategoryItem = ({ thumbnail, name, code }) => {
  return (
    <Link
      href={{
        pathname: `/the-loai/${code}`,
        query: {
          name: name,
        },
      }}
      passHref
    >
      <a
        title={`Thể loại truyện full ${name}`}
        className="text-black text-xs sm:text-sm cursor-pointer hover:translate-y-[-5%] transition delay-75"
      >
        {thumbnail ? (
          <Image
            loader={imageLoader}
            className="rounded-xl self-center"
            width={130}
            height={60}
            src={thumbnail}
            alt={name}
          />
        ) : null}
        <div className="font-semibold self-center">{name}</div>
      </a>
    </Link>
  );
};

export default CategoryItem;
