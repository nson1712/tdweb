import Image from "next/image";
import CompleteIcon from "../../images/Completed.svg";
import PendingIcon from "../../images/Loading.svg";
import clsx from "clsx";
import imageLoader from "../../loader/imageLoader";

const STORY_STATUSES = [
  {
    status: "ACTIVE",
    icon: CompleteIcon,
    label: "Hoàn thành",
  },
  {
    status: "PENDING",
    icon: PendingIcon,
    label: "Đang ra",
  },
];

const StoryStatus = ({ status, lightBg }) => {
  const normalizedStatus = status.toLowerCase(); // Đảm bảo không bị lỗi do viết hoa/thường
  const currentStatus = STORY_STATUSES.find(
    (item) => item.status.toLowerCase() === normalizedStatus
  );

  return (
    <div
      className={clsx("flex w-fit rounded-[10px] gap-x-[4px] pr-1", {
        "bg-white": lightBg,
        "bg-black bg-opacity-60": !lightBg,
      })}
    >
      {currentStatus?.icon ? <Image
        loader={imageLoader}
        width={14}
        height={14}
        className="max-w-[14px] max-h-[14px] rounded-full self-center"
        src={currentStatus?.icon}
        alt={currentStatus?.label ?? "story status"}
      /> : null}

      <div
        className={clsx("flex text-[12px] font-medium self-center pr-1", {
          "text-green":
            currentStatus?.status.toLowerCase() === "completed" ||
            currentStatus?.status === "ACTIVE",
          "text-[#256077]":
            currentStatus?.status.toLowerCase() === "pending" ||
            currentStatus?.status === "PENDING",
        })}
      >
        {currentStatus?.label}
      </div>
    </div>
  );
};

export default StoryStatus;
