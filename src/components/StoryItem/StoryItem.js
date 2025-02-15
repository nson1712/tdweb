import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { formatStringToNumber } from "../../utils/utils";
import Router from "next/router";
import Link from "next/link";

function generateRandom() {
  const randomNum = 5000 + Math.random() * 5000;
  return Math.round(randomNum / 100) * 100;
}

const StoryItem = ({
  item,
  direction = "col",
  chapterSlug,
  currentChap,
  isBookMarked,
  fromSlide,
  fromSearch,
  saveStory,
}) => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  const contentWidth = Math.min(screenWidth, 768);

  return (
    <div
      className={classNames(
        "flex flex-col cursor-pointer",
        direction === "row" && "flex-row items-start"
      )}
      onClick={() => {
        if (saveStory) {
          saveStory(item.slug);
        }
        // if (chapterSlug) {
        //   Router.push(`/${item.slug}/${chapterSlug}`)
        // } else {
        //   Router.push(`/${item.slug}`)
        // }
      }}
    >
      <div
        className={classNames(
          "bg-gray",
          direction === "row"
            ? "mr-[8px]"
            : "mb-[10px] rounded-[10px] overflow-hidden"
        )}
      >
        <Link
          href={`${
            chapterSlug ? `/${item.slug}/${chapterSlug}` : `/${item.slug}`
          }`}
          passHref
        >
          <a title={`Truyện ${item.title}`}>
            <img
              src={item.thumbnail || item.coverImage}
              alt={`Truyện ${item.title}`}
              title={`Truyện ${item.title}`}
              className={classNames(
                "w-full",
                direction === "row"
                  ? "w-[40px] rounded-[10px]"
                  : "h-[90px] object-cover"
              )}
              style={
                fromSlide
                  ? {
                      width: `${(contentWidth - 16) / 4 - 16}px`,
                      height: `${(((contentWidth - 16) / 4 - 16) * 90) / 75}px`,
                    }
                  : direction === "row" && { width: "40px" }
              }
            />
          </a>
        </Link>
      </div>

      <div className={classNames(direction === "row" && "flex-1")}>
        <div className="flex items-center justify-between mb-[4px]">
          <Link
            href={`${
              chapterSlug ? `/${item.slug}/${chapterSlug}` : `/${item.slug}`
            }`}
            passHref
          >
            <a
              className={classNames(
                "text-[14px] font-semibold leading-[16px] main-text mb-0 line-clamp-2",
                direction === "col" && "mb-[4px]  h-[32px]",
                direction === "row" && "text-[12px] mb-[4px]"
              )}
              title={`Truyện ${item.title}`}
            >
              {item.title}
            </a>
          </Link>
          {isBookMarked && (
            <img
              src="/images/book-mark-active.svg"
              className="w-[24px]"
              alt="Đã thêm vào thư viện"
              title="Thêm vào thư viện"
            />
          )}
        </div>

        <div
          className={classNames(
            direction === "row" && "flex items-center",
            fromSlide === true && "hidden md:flex",
            fromSearch && "flex-col flex-start"
          )}
        >
          <p
            className={classNames(
              "text-[12px] font-medium leading-[16px] label-text",
              direction === "col" && "mb-[4px]",
              direction === "row" && "mb-[8px] mr-[32px]",
              fromSearch && "mb-[4px]"
            )}
          >
            {formatStringToNumber(item.totalView)} lượt xem
          </p>
          <p
            className={classNames(
              "text-[12px] font-medium leading-[16px] label-text flex items-center",
              direction === "col" && "mb-0",
              direction === "row" && "mb-[8px]",
              fromSearch && "mb-[4px]"
            )}
          >
            {formatStringToNumber(item.rate)}/5
            <img
              src="/images/star.svg"
              className="w-[12px] ml-[4px]"
              alt="Đánh giá truyện"
              title="Đánh giá truyện"
            />
          </p>
        </div>
        {direction === "row" && !fromSearch && (
          <>
            <p className="secondary-text text-[12px] font-medium leading-[16px] mb-[4px]">
              Tác giả: {item?.author?.name}
            </p>
            {!currentChap && (
              <p className="secondary-text text-[12px] font-medium leading-[16px] mb-0">
                Độ dài: {item.totalChapter} chương
              </p>
            )}
            <h3 className="secondary-text text-[12px] font-medium leading-[16px] mt-[4px] mb-0">
              Thể loại:{" "}
              {item?.categories?.slice(0, 3).map((item, i) => (
                <Link
                  href={`/the-loai/${item.code}`}
                  title={`Thể loại truyện ${item.name}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  passHref
                >
                  <a
                    className="secondary-text text-[12px] font-medium leading-[16px] mt-[4px] mb-0 mr-[6px]"
                    title={`Thể loại truyện ${item.name}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      Router.push(`/the-loai/${item.code}`);
                    }}
                  >
                    {item.name}
                    {i !== 2 && ","}
                  </a>
                </Link>
              ))}
            </h3>
          </>
        )}

        {currentChap && (
          <>
            <div className="mb-[6px] h-[4px] rounded-[2px] progress-color relative mt-[8px] max-w-[245px]">
              <div
                className="absolute left-0 top-0 bottom-0 progress-active-color"
                style={{
                  width: `${(currentChap / item.totalChapter) * 100}%`,
                }}
              />
            </div>
            <p className="mb-0 text-[12px] leading-[16px] font-medium secondary-text">
              Hoàn thành: {currentChap}/{item.totalChapter} chương
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default StoryItem;
