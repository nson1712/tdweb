import React from "react";
import Image from "next/image";
import clsx from "clsx";
import TagComponent from "./TagComponent";
import TotalView from "../TotalView";
import StarsRate from "../StarRate";
import StoryStatus from "../StoryStatus";
import GoldenTicket from "../GoldenTicket";
import imageLoader from "../../loader/imageLoader";
import { getSlugfromSlugGenerate, slugGenerate } from "../../utils/utils";
import Link from "next/link";

const HorizontalStoryItem = ({
  title,
  slug,
  coverImage,
  rate,
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
      className={clsx("w-full flex gap-x-4 cursor-pointer", {
        "w-full rounded-e-[20px] rounded-tl-[20px] rounded-bl-[20px] shadow-md hover:translate-y-[-5%] transition delay-75":
          type !== "secondary" && type !== "primary",
        "max-w-full px-2 py-2 rounded-t-[20px] drop-shadow-sm":
          type === "secondary",
        "max-w-[268px] max-h-fit shadow-md rounded-e-[20px] hover:translate-y-[-5%] transition delay-75":
          type === "primary",
        "bg-white": whiteBg,
      })}
    >
      <div
        className={clsx("self-center flex", {
          "max-w-[120px]": type !== "secondary" && type !== "primary",
          "max-w-[40px] max-h-[60px] relative": type === "secondary",
          "max-w-[66px] max-h-[100px] relative": type === "primary",
        })}
      >
        {coverImage ? (
          <Image
            loader={imageLoader}
            className={clsx(
              "rounded-e-[5px] rounded-tl-[20px] rounded-bl-[5px]"
            )}
            src={coverImage}
            alt={title}
            title={title}
            width={type !== "secondary" && type !== "primary" ? 160 : 50}
            height={type !== "secondary" && type !== "primary" ? 220 : 70}
          />
        ) : null}
      </div>

      <Link href={`/${slug}`} passHref>
        <a
          title={title}
          className={clsx("py-2", {
            "w-full mr-2 space-y-1.5":
              type !== "secondary" && type !== "primary",
            "space-y-2": type === "secondary",
            "self-center": type === "primary",
          })}
        >
          <div
            className={clsx("", {
              "font-[500] text-[16px] text-black leading-normal w-full line-clamp-2":
                type !== "secondary" && type !== "primary",
              "max-h-10 font-medium text-[14px] text-black line-clamp-1":
                type === "secondary",
              "max-h-[42px] font-[500] text-[14px] leading-normal overflow-hidden line-clamp-2":
                type === "primary",
            })}
          >
            {title}
          </div>

          <div className="whitespace-normal gap-x-1 max-h-fit space-y-2">
            {tagVisible && (
              <TagComponent
                categories={categories}
                categoriesVisible={categoriesVisible}
                mainCategories={mainCategories}
                mainCategoriesVisible={mainCategoriesVisible}
                totalCategories={totalCategories}
                totalCategoriesVisible={totalCategoriesVisible}
              />
            )}

            <div
              className={clsx("flex flex-row gap-x-2.5", {
                "max-h-3.5 self-center":
                  type !== "secondary" && type !== "primary",
                "w-fit max-h-[22px] py-1": type === "secondary",
              })}
            >
              {starVisible && (
                <div className={clsx("", { "mt-1": type === "primary" })}>
                  <StarsRate rate={rate} lightBg={true} />
                </div>
              )}
              {viewVisible && <TotalView totalView={totalView || 0} />}
              {statusVisible && <StoryStatus status={status} lightBg={true} />}
            </div>

            {goldenTicketVisible && (
              <GoldenTicket goldenTicketPercent={goldenTicketPercent} />
            )}
          </div>
        </a>
      </Link>
    </div>
  );
};

export default HorizontalStoryItem;
