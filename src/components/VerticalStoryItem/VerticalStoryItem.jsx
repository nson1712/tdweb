import Image from "next/image";
import imageLoader from "../../loader/imageLoader";
import Link from "next/link";
import MarkedLabel from "../MarkedLabel";
import StarsRate from "../StarRate";
import TotalView from "../TotalView";
import Heart from "../Heart";

const VerticalStoryItem = ({ title, slug, coverImage, status, rate, totalView }) => {
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
          <div className='relative'>
            <Image
              loader={imageLoader}
              className="max-w-[120px] max-h-[165px] rounded-tl-[25px] rounded-bl-[5px] rounded-e-[5px] "
              width={120}
              height={165}
              src={coverImage}
              alt={title}
              title={title}
            />
             <div className="w-full flex flex-col justify-center items-center bg-black/60 mb-[5px] absolute bottom-0 max-w-full h-[15%] sm:h-[10%] overflow-hidden">
          
              <div className="flex flex-row gap-3 self-center items-center ml-[5px] mr-[5px]">
                <Heart rate={rate} lightBg={true} className={'text-white'}/>
                <TotalView totalView={totalView || 0} textStyle={'text-white'}/>
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
