import Image from "next/image";
import DotIcon from "../../../public/icons/DotIcon";
import { roundTo1Digits } from "../../utils/utils";
import { Spin } from "antd";
import imageLoader from "../../loader/imageLoader";
import Link from "next/link";

const UnfinishedStoryDetailItem = ({
  readingPercent,
  title,
  currentChapterOrder,
  coverImage,
  storySlug,
  chapterSlug,
}) => {
  return (
    <Link href={`/${storySlug}/${chapterSlug}`} passHref>
      <a
        className="w-full rounded-3xl bg-gradient-to-r from-[#727D7F] to-[#474747] px-3 py-2 cursor-pointer hover:translate-y-[-5%] transition delay-75"
        title={title}
      >
        <div className="flex gap-x-2.5">
          <div className="w-[40px]">
            {coverImage ? (
              <Image
                loader={imageLoader}
                className="rounded-[5px]"
                width={35}
                height={45}
                src={coverImage}
                alt={title}
                title={title}
              />
            ) : (
              <Spin spinning={true} />
            )}
          </div>

          <div className="self-center">
            <p className="text-md text-white m-0">Bạn đang đọc truyện</p>
            <div className="text-base text-white overflow-hidden text-ellipsis line-clamp-1 font-bold">
              {title}
            </div>
            <div className="flex gap-x-2">
              <div className="text-xs text-white leading-[20px] font-medium">
                Chương {currentChapterOrder}
              </div>
              <DotIcon />
              <div className="text-xs text-white leading-[20px] font-medium">
                {roundTo1Digits(readingPercent)}% Hoàn thành
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default UnfinishedStoryDetailItem;
