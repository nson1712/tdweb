import React from "react";
import Image from "next/image";
import TotalLike from "./TotalLikes";
import TotalComments from "./TotalComments";
import { useState } from "react";
import StarsRate from "../StarRate";

const CommentCardItem = ({
  comment,
  commentStarRate,
  totalLikes,
  totalComments,
  userAvatar,
}) => {
  const text = comment;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <div className="flex w-full px-2 py-2 rounded-b-[20px] bg-[#F5F8FF] shadow-md">
      <div className="flex flex-row gap-x-2 ">
        <div className="max-w-[32px] max-h-[32px]">
          <Image
            className="rounded-full"
            width={32}
            height={32}
            src={userAvatar}
            alt="userAvatar"
          />
        </div>

        <div className="w-full flex flex-col gap-y-2">
          <div className="font-medium text-[14px] text-[#707070] overflow-hidden leading-tight">
            <p>
              {isReadMore ? text.slice(0, 100) : text}
              <span
                className="text-blue-500 text-[14px] cursor-pointer"
                onClick={toggleReadMore}
              >
                {isReadMore ? "... Xem thêm" : " Thu gọn"}
              </span>
            </p>
          </div>

          <div className="flex flex-row gap-x-2 max-h-4 w-fit">
            <div className="mt-0.5">
              <StarsRate
                starRate={commentStarRate}
                lightBg={true}
                color="primary"
              />
            </div>
            <TotalLike totalLikes={totalLikes} />
            <TotalComments totalComments={totalComments} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCardItem;
