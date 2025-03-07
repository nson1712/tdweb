import Image from "next/image";
import imageLoader from "../../loader/imageLoader";
import Link from "next/link";
import MarkedLabel from "../MarkedLabel";

const VerticalStoryItem = ({ title, slug, coverImage, status }) => {
  return (
    <Link href={`/${slug}`} passHref>
      <a
        title={`Truyện full ${title}`}
        className="max-w-fit flex flex-col gap-y-2 cursor-pointer hover:translate-y-[-5%] transition delay-75 relative z-5"
      >
        {status === "ACTIVE" && (
          <MarkedLabel />
        )}
        {coverImage ? (
          <Image
            loader={imageLoader}
            className="max-w-[120px] max-h-[165px] rounded-tl-[25px] rounded-bl-[5px] rounded-e-[5px] "
            width={120}
            height={165}
            src={coverImage}
            alt={title}
            title={title}
          />
        ) : null}

        <div className="w-full flex justify-center items-center bg-black/60 absolute bottom-0 max-w-full h-[45%] sm:h-[40%] overflow-hidden">
          <h3 className="line-clamp-3 px-[1px] m-0 story-item-title text-white text-center sm:text-xs">{title}</h3>
        </div>
      </a>
    </Link>
  );
};

export default VerticalStoryItem;
