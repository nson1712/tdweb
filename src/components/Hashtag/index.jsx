import Link from "next/link";
import Image from "next/image";
import imageLoader from "../../loader/imageLoader";

const Hashtag = ({ hashtag, index }) => {
  return (
    <>
      {hashtag?.image ? (
        <Link href={`/hashtag/${hashtag?.name}`} passHref>
          <a>
            <span className="flex sm:hidden">
              <Image
                src={hashtag?.image}
                width={120}
                height={35}
                loader={imageLoader}
              />
            </span>
            <span className="hidden sm:flex">
              <Image
                src={hashtag?.image}
                width={180}
                height={45}
                loader={imageLoader}
              />
            </span>
          </a>
        </Link>
      ) : (
        <div className="font-medium text-xs sm:text-sm md:text-base rounded-2xl px-3 py-2 text-[#5C95C6] bg-gradient-to-r from-[#AACAF9] via-[#EAF1FB] to-[#D3E2F8] shadow-md shadow-blue-300 cursor-pointer hover:translate-y-[-5%] transition delay-100 hover:!text-[#5C95C6]">
          <Link href={`/hashtag/${hashtag?.name}`} passHref>
            <a title={`Thể loại truyện ${hashtag?.name}`} className="pr-[3px]">
              #{hashtag?.name}
            </a>
          </Link>
          {index <= 5 && (
            <Image
              loader={imageLoader}
              src={"/images/trend-up.png"}
              width={16}
              height={16}
              alt={"Top"}
              priority
            />
          )}
        </div>
      )}
    </>
  );
};

export default Hashtag;
