import { CommentOutlined, LikeFilled, LikeOutlined } from "@ant-design/icons";
import { Divider, Rate } from "antd";
import Image from "next/image";
import { calculateCreatedTime } from "../../utils/utils";
import imageLoader from "../../loader/imageLoader";
import GlobalStore from "../../stores/GlobalStore";
import StoryStore from "../../stores/StoryStore";

export const RatingCard = ({
  id,
  parentId,
  message,
  avatar,
  displayName,
  rate,
  totalLike,
  totalComment,
  createdAt,
  isLike,
  handleLikeUnlike,
  handleForceLogin,
}) => {
  const { setShowRatingComment, setParentId } = StoryStore;
  const handleOpenCommentModal = () => {
    setParentId(id);
    setShowRatingComment(true);
  };
  const isLoggedIn = GlobalStore.checkIsLogin();
  return (
    <div className="relative w-72 bg-white rounded-2xl mt-3 z-99">
      <div className="absolute w-fit rounded-full px-2 py-0 bg-gray-50/50 right-5 -top-3">
        <Rate className="text-[10px]" allowHalf disabled value={rate ?? 0} />
      </div>
      <div className="flex gap-x-2 px-2 pt-3 pb-2">
        <div className="w-10 h-10">
          <Image
            className="rounded-full"
            width={40}
            height={40}
            src={avatar ?? "/images/user.png"}
            alt={displayName}
            loader={imageLoader}
          />
        </div>
        <div className="flex-1 font-bold text-sm self-center line-clamp-2 break-words">
          {displayName}
        </div>
      </div>
      <div className="h-16 overflow-y-auto break-words text-sm px-2">
        <div>{message}</div>
      </div>

      <Divider className="my-3" />

      <div className="flex pb-3 gap-x-2 justify-end self-center px-2">
        <div className="flex gap-x-1 text-xs text-gray-400/90">
          <div
            className="cursor-pointer hover:scale-110 transition-all duration-200 active:scale-90"
            onClick={() =>
              isLoggedIn
                ? handleLikeUnlike(id, isLike, parentId)
                : handleForceLogin()
            }
          >
            {isLike ? (
              <LikeFilled className="self-center text-blue-500" />
            ) : (
              <LikeOutlined className="self-center" />
            )}
          </div>{" "}
          <span className="self-center">{totalLike}</span>
        </div>
        <div className="flex gap-x-1 text-xs text-gray-400/90">
          <CommentOutlined
            className="cursor-pointer hover:scale-105"
            onClick={
              GlobalStore.isLoggedIn ? handleOpenCommentModal : handleForceLogin
            }
          />
          <span className="self-center">{totalComment}</span>
        </div>
        <div className="flex gap-x-1 text-xs">
          <div className="bg-slate-500/50 rounded-full w-1 h-1 self-center"></div>{" "}
          <span className="text-gray-400 font-light">
            {calculateCreatedTime(createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};
