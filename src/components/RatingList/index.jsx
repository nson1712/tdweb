import RatingListItem from "./RatingListItem";
import RatingListTitle from "./RatingListTitle";


const RatingList = ({ ratings }) => (
  <div className="space-y-4">
    <RatingListTitle />
    {ratings?.data?.map((item, index) => (
      <RatingListItem
        key={item.id || index}
        story={{ ...item.story, id: index }}
        comment={{
          id: item.id,
          message: item.message,
          customerRate: item.customerRate,
          totalLike: item.totalLike,
          totalComment: item.totalComment,
          userAvatar: item.author?.avatar,
        }}
      />
    ))}
  </div>
);

export default RatingList;
