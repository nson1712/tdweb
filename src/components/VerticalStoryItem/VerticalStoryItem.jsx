import Image from "next/image";
import { useRouter } from "next/router";
import imageLoader from "../../loader/imageLoader";

const VerticalStoryItem = ({ title, slug, coverImage }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/${slug}`);
  };
  return (
    <div
      className="max-w-fit flex flex-col gap-y-2 cursor-pointer hover:translate-y-[-5%] transition delay-75"
      onClick={handleClick}
    >
      {coverImage ? (
        <Image
          loader={imageLoader}
          className="max-w-[125px] max-h-[235px] rounded-tl-[25px] rounded-bl-[5px] rounded-e-[5px]"
          width={150}
          height={200}
          src={coverImage}
          alt={title}
        />
      ) : null}

      <div className="max-w-full max-h-auto text-black text-sm text-center font-bold leading-normal overflow-hidden text-ellipsis line-clamp-2 align-top px-2">
        {title}
      </div>
    </div>
  );
};

export default VerticalStoryItem;
