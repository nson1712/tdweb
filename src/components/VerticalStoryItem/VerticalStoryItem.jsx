import Image from "next/image";
import imageLoader from "../../loader/imageLoader";
import Link from "next/link";
import MarkedLabel from "../MarkedLabel";
import TotalView from "../TotalView";

const VerticalStoryItem = ({
  title,
  slug,
  coverImage,
  status,
  rate,
  totalView,
  totalLike,
}) => {
  return (
    <Link href={`/${slug}`} passHref>
      <a
        title={`Truyện full ${title}`}
        className="max-w-fit flex flex-col gap-y-2 cursor-pointer hover:translate-y-[-5%] transition delay-75 relative z-5"
      >
        {status === "ACTIVE" && <MarkedLabel />}
        {coverImage ? (
          <div className="relative">
            <Image
              loader={imageLoader}
              className="aspect-[3/4] rounded-tl-[25px] rounded-bl-[5px] rounded-e-[5px] "
              width={200}
              height={266}
              src={coverImage}
              alt={title}
              title={title}
            />
            <div className="w-full flex justify-center bg-black/60 mb-[5px] absolute bottom-0 max-w-full h-[15%] sm:h-[10%] ">
              <div className="flex gap-x-1 sm:gap-4">
                <div className="flex gap-x-0.5">
                  <div className="h-3 w-3 flex self-center">
                    <Image
                      className="aspect-square"
                      src="/images/heart-icon.png"
                      width={12}
                      height={12}
                      alt="heart-icon"
                      loader={imageLoader}
                    />
                  </div>
                  <div className="text-white text-xs self-center">
                    {totalLike ?? 0}
                  </div>
                </div>

                <div className="flex gap-x-0.5">
                  <div className="h-3 w-3 flex self-center -mt-0.5">
                    <Image
                      className="aspect-square"
                      src="/images/star-icon.png"
                      width={12}
                      height={12}
                      alt="star-icon"
                      loader={imageLoader}
                    />
                  </div>{" "}
                  <div className="text-white text-xs self-center">
                    {(rate ?? 0).toFixed(1)}
                  </div>
                </div>
                <div className="self-center">
                  <TotalView
                  totalView={totalView || 0}
                  className="text-white"
                />
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <h3 className="px-[1px] m-0 story-item-title">{title}</h3>
      </a>
    </Link>
  );
};

export default VerticalStoryItem;
