import Image from "next/image";
import DotIcon from "../../../public/icons/DotIcon";

const UnfinishedStoryDetailItem = ({
  completedPercent,
  name,
  unfinishedChapter,
  thumbnail,
}) => {
  return (
    <div className="w-full rounded-3xl bg-gradient-to-r from-[#727D7F] to-[#474747] px-4 py-3 cursor-pointer hover:translate-y-[-5%] transition delay-75">
      <div className="flex gap-x-2.5">
        <div className="w-[60px] self-center">
        <Image
          className="rounded-[5px]"
          width={80}
          height={100}
          src={`${thumbnail}`}
          alt=""
          fill={true}
        />
        </div>

        <div>
          <div className="text-base text-white overflow-hidden text-ellipsis line-clamp-1 font-bold">
            {name}
          </div>
          <div className="flex gap-x-2">
            <div className="text-xs text-white leading-[20px] font-medium">
              Ch. {unfinishedChapter}
            </div>
            <DotIcon />
            <div className="text-xs text-white leading-[20px] font-medium">
              {completedPercent}% Hoàn thành
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnfinishedStoryDetailItem;
