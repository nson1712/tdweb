import Image from "next/image";
import imageLoader from "../../loader/imageLoader";
import Link from "next/link";

const VerticalStoryItem = ({ title, slug, coverImage, status }) => {
  return (
    <Link href={`/${slug}`} passHref>
      <a
        title={`Truyện full ${title}`}
        className="max-w-fit flex flex-col gap-y-2 cursor-pointer hover:translate-y-[-5%] transition delay-75 relative z-5"
      >
        {status === "ACTIVE" && (
          <>
            <div className="absolute top-0 -left-7 -rotate-45 text-white bg-green-500 z-10 pl-6 pr-3 py-0.5 text-xs [clip-path:polygon(40%_0,calc(110%_-_10px)_0,90%_50%,calc(110%_-_10px)_100%,0_100%)]">
              Hoàn
            </div>
            <div
              class="absolute -left-5 top-7 w-5 h-5 bg-green-600 z-6
             [clip-path:polygon(100%_100%,150%_-50%,50%_55%)]"
            ></div>
          </>
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

        <div className="w-full bg-black/60 absolute bottom-0 max-w-full max-h-auto text-white text-xs text-center font-[500] leading-normal overflow-hidden text-ellipsis line-clamp-3 align-top font-">
          {title}
        </div>
      </a>
    </Link>
  );
};

export default VerticalStoryItem;
