import HorizontalStory from "../HorizontalStoryItem";
import CommentCard from "../CommentCardItem";

const RatingListItem = ({ story, comment }) => (
  <div>
    <HorizontalStory
      items={[story]}
      type="secondary"
      whiteBg
      viewVisible
      starVisible
      statusVisible
    />
    <CommentCard items={[comment]} />
  </div>
);

export default RatingListItem; 