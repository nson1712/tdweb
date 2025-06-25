"use client"
import { CiCircleFilled, CommentOutlined, DotNetOutlined, LikeOutlined } from "@ant-design/icons";
import { Divider, Rate } from "antd";
import Image from "next/image";
import { calculateCreatedTime } from "../../utils/utils";
import { now } from "moment";

export const RatingCard = ({
  avatar,
  displayName,
  rate,
  totalLike,
  totalComment,
  createdAt,
}) => {
  return (
    <div className="relative w-72 bg-white rounded-2xl mt-3 z-99">
      <div className="absolute w-fit rounded-full px-2 py-0 bg-gray-50/50 right-5 -top-3">
        <Rate className="text-[10px]" allowHalf value={5} />
      </div>
      <div className="flex gap-x-2 px-2 pt-3 pb-2">
        <div className="w-10 h-10">
          <Image
          className="rounded-full"
          width={40}
          height={40}
          src={avatar}
          alt="avatar"
        />
        </div>
        <div className="flex-1 font-bold text-sm self-center line-clamp-2  break-words">Ngọc Sơn ét và hát zcxv xzcv zxcv zzxcvzxcvzxcvzxcvzxcvzxcvxzcvxzcvzxcvzxcv</div>
      </div>
      <div className="h-16 overflow-y-auto break-words text-sm px-2">
        <div>hehehehe</div>
        <div>
          hehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehe
        </div>
        <div>hehehehe</div>
        <div>hehehehe</div>
        <div>hehehehe</div>
        <div>hehehehe</div>
      </div>

      <Divider className="my-3" style={{ width: '50%', margin: '0 auto' }} />

      <div className="flex pb-3 gap-x-2 justify-end self-center px-2">
        <div className="flex gap-x-1 text-xs text-gray-400/90">
          <LikeOutlined className="self-center" /> <span className="self-center">{100}</span>
        </div>
        <div className="flex gap-x-1 text-xs text-gray-400/90">
          <CommentOutlined  />{" "}
          <span className="self-center">{100}</span>
        </div>
        <div className="flex gap-x-1 text-xs">
          <div className="bg-slate-500/50 rounded-full w-1.5 h-1.5 self-center"></div> <span className="text-gray-400">{calculateCreatedTime(now())}</span>
        </div>
      </div>
    </div>
  );
};
