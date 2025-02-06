import React from "react";
import Image from "next/image";
import clsx from "clsx";
import TagComponent from "./TagComponent";
import TotalView from "../TotalView";
import StarsRate from "../StarRate";
import StoryStatus from "../StoryStatus";
import GoldenTicket from "../GoldenTicket";

const HorizontalStoryItem = ({
  title,
  coverImage,
  starRate,
  status,
  totalView,
  categories,
  mainCategories,
  totalCategories,
  goldenTicketPercent,
  tagVisible,
  statusVisible,
  viewVisible,
  starVisible,
  goldenTicketVisible,
  categoriesVisible,
  mainCategoriesVisible,
  totalCategoriesVisible,
  type,
  whiteBg,
}) => {
  return (
    <div
      className={clsx("w-full flex flex-row gap-x-4 cursor-pointer", {
        "w-auto rounded-e-[20px] rounded-tl-[20px] rounded-bl-[20px] shadow-md hover:translate-y-[-5%] transition delay-75":
          type !== "secondary" && type !== "primary",
        "max-w-full px-2 py-2 rounded-t-[20px] drop-shadow-sm":
          type === "secondary",
        "max-w-[268px] max-h-fit shadow-md rounded-e-[20px] hover:translate-y-[-5%] transition delay-75":
          type === "primary",
        "bg-white": whiteBg,
      })}
    >
      <Image
        className={clsx("rounded-e-[5px] rounded-tl-[20px] rounded-bl-[5px]", {
          "max-w-[107px] max-h-fit": type !== "secondary" && type !== "primary",
          "max-w-[40px] max-h-[60px]": type === "secondary",
          "max-w-[66px] max-h-[100px]": type === "primary",
        })}
        src={coverImage || ""}
        alt={title}
        width={50}
        height={40}
      />
      <div
        className={clsx("flex flex-col py-2 ", {
          "max-w-[230px] max-h-[120px] mr-2 gap-y-1.5":
            type !== "secondary" && type !== "primary",
          "max-w-[260px] max-h-[66px] gap-y-2": type === "secondary",
          "self-center": type === "primary",
        })}
      >
        <div
          className={clsx("", {
            "max-h-[72px] font-semibold text-[16px] text-black leading-normal":
              type !== "secondary" && type !== "primary",
            "max-h-10 font-medium text-[14px] text-black line-clamp-1":
              type === "secondary",
            "max-h-[42px] font-semibold text-[14px] leading-normal overflow-hidden line-clamp-2":
              type === "primary",
          })}
        >
          {title}
        </div>

        <div className="flex flex-wrap max-w-[230px] whitespace-normal gap-x-1 max-h-fit gap-y-2">
          {tagVisible && (
            <>
              <TagComponent
                categories={categories}
                categoriesVisible={categoriesVisible}
                mainCategories={mainCategories}
                mainCategoriesVisible={mainCategoriesVisible}
                totalCategories={totalCategories}
                totalCategoriesVisible={totalCategoriesVisible}
              />
            </>
          )}

          <div
            className={clsx("flex flex-row gap-x-2.5 ", {
              "max-h-3.5 self-center":
                type !== "secondary" && type !== "primary",
              "w-fit max-h-[22px] py-1 -mt-[1px]": type === "secondary",
            })}
          >
            {starVisible && (
              <div
                className={clsx("", {
                  "mt-1": type === "primary",
                })}
              >
                <StarsRate starRate={starRate} lightBg={true} />
              </div>
            )}
            {viewVisible && <TotalView totalView={totalView || 0} />}
          </div>
          {statusVisible && <StoryStatus status={status} lightBg={true} />}
          {goldenTicketVisible && (
            <GoldenTicket goldenTicketPercent={goldenTicketPercent} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HorizontalStoryItem;
