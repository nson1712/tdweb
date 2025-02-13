import { toJS } from "mobx";
import CommentCard from "../CommentCardItem";
import HorizontalStory from "../HorizontalStoryItem";

const RatingList = ({ ratings }) => {
  return (
    <div className="space-y-4">
      <div className="font-bold text-lg leading-normal">Đánh giá truyện</div>
      {ratings?.data?.slice(0, 4).map(
        (item, index) => (
          (
            <div key={index}>
              <HorizontalStory
                items={[{ ...item.story, id: index }]}
                type="secondary"
                whiteBg
                viewVisible
                starVisible
                statusVisible
              />
              <CommentCard
                items={[
                  {
                    id: item.id,
                    message: item.message,
                    customerRate: item.customerRate,
                    totalLike: item.totalLike,
                    totalComment: item.totalComment,
                    userAvatar: item.author?.avatar,
                  },
                ]}
              />
            </div>
          )
        )
      )}
    </div>
  );
};

export default RatingList;
