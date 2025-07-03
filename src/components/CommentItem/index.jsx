import { Avatar, Button, Typography } from "antd";
import {
  calculateCreatedTime,
  getContentAfterParenthesis,
  getContentInsideBrackets,
} from "../../utils/utils";
import { LikeFilled, LikeOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
// import GlobalStore from "../../stores/GlobalStore";
// import StoryStore from "../../stores/StoryStore";

const { Paragraph } = Typography;

const Comment = ({
  // id,
  // parentId,
  author,
  avatar,
  content,
  totalLike,
  timestamp,
  onReply,
  children,
  isLike,
}) => {
  const router = useRouter();
  // const isLoggedIn = GlobalStore.checkIsLogin();
  // const { handleLikeUnlikeComment } = StoryStore;
  // const handleForceLogin = () => {
  //   router.push("/dang-nhap");
  // };

  // Format the timestamp (optional)
  const formattedTime = timestamp
    ? calculateCreatedTime(new Date(timestamp))
    : null;

  const renderContent = () => {
    if (content?.includes("@", 0)) {
      return (
        <Paragraph>
          <span className="text-blue-600">
            @{getContentInsideBrackets(content)}{" "}
          </span>
          {getContentAfterParenthesis(content)}
        </Paragraph>
      );
    }
    return <Paragraph>{content}</Paragraph>;
  };

  return (
    <div className="p-3">
      <div className="flex items-center mb-2">
        <Avatar src={avatar} alt={author} />
        <div className="ml-3 flex-1">
          <span className="font-semibold text-sm">{author}</span>
          {formattedTime && (
            <span className="text-xs text-gray-500 ml-2">{formattedTime}</span>
          )}
        </div>
      </div>
      <div className="ml-8">
        {renderContent()}
        <div className="flex">
          <div
            className="flex gap-x-1 text-xs"
            // onClick={() =>
            //   isLoggedIn
            //     ? handleLikeUnlikeComment(id, isLike, parentId)
            //     : handleForceLogin()
            // }
          >
            {isLike ? (
              <LikeFilled className="text-blue-500 -mt-0.5" />
            ) : (
              <LikeOutlined className="-mt-0.5" />
            )}
            <div className="self-center">{totalLike}</div>
          </div>
          <Button
            className="text-xs text-blue-500"
            onClick={onReply}
            type="link"
            size="small"
          >
            Trả lời
          </Button>
        </div>
      </div>
      {children && <div className="ml-8">{children}</div>}
    </div>
  );
};

export default Comment;
