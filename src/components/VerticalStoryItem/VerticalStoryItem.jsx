import Image from "next/image";
import imageLoader from "../../loader/imageLoader";
import Link from "next/link";

const VerticalStoryItem = ({ title, slug, coverImage }) => {
  return (
    <Link href={`${slug}`}>
      <a
        title={title}
        className="max-w-fit flex flex-col gap-y-2 cursor-pointer hover:translate-y-[-5%] transition delay-75"
      >
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

        <div className="max-w-full max-h-auto text-black text-sm text-center font-[500] leading-normal overflow-hidden text-ellipsis line-clamp-2 align-top">
          {title}
        </div>
      </a>
    </Link>
  );
};

export default VerticalStoryItem;
