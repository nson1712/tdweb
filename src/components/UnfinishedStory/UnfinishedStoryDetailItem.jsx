import Image from "next/image";
import DotIcon from "../../../public/icons/DotIcon";
import { roundTo1Digits } from "../../utils/utils";
import { Spin } from "antd";
import { useRouter } from "next/router";

const UnfinishedStoryDetailItem = ({
  readingPercent,
  title,
  currentChapterOrder,
  coverImage,
  storySlug,
  chapterSlug,
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.replace(`/${storySlug}/${chapterSlug}`);
  };

  return (
    <div
      className="w-full rounded-3xl bg-gradient-to-r from-[#727D7F] to-[#474747] px-4 py-3 cursor-pointer hover:translate-y-[-5%] transition delay-75"
      onClick={handleClick}
    >
      <div className="flex gap-x-2.5">
        <div className="w-[40px]">
          {coverImage ? (
            <Image
              className="rounded-[5px]"
              width={35}
              height={45}
              src={coverImage}
              alt={title || "Unfinish story"}
            />
          ) : (
            <Spin spinning={true} />
          )}
        </div>

        <div className="self-center">
          <div className="text-base text-white overflow-hidden text-ellipsis line-clamp-1 font-bold">
            {title}
          </div>
          <div className="flex gap-x-2">
            <div className="text-xs text-white leading-[20px] font-medium">
              Ch. {currentChapterOrder}
            </div>
            <DotIcon />
            <div className="text-xs text-white leading-[20px] font-medium">
              {roundTo1Digits(readingPercent)}% Hoàn thành
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnfinishedStoryDetailItem;
