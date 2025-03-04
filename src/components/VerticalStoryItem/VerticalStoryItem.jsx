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
            className="max-w-[115px] max-h-[165px] rounded-tl-[25px] rounded-bl-[5px] rounded-e-[5px] "
            width={115}
            height={165}
            src={coverImage}
            alt={title}
            title={title}
          />
        ) : null}

        <div className="w-full flex justify-center items-center bg-black/60 absolute bottom-0 max-w-full h-[40%] text-white text-xs text-center font-[500] leading-normal overflow-hidden">
          <div className="line-clamp-3 px-1">{title}</div>
        </div>
      </a>
    </Link>
  );
};

export default VerticalStoryItem;
