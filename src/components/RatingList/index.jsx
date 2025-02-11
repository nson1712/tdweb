import CommentCard from "../CommentCardItem"
import HorizontalStory from "../HorizontalStoryItem"

const RatingList = ({data}) => {
  return (
        <div className="space-y-4">
          <div className="font-bold text-lg leading-normal">
            Đánh giá truyện
          </div>
          {data.map((item, index) => (
            <div key={index}>
              <HorizontalStory
                items={item.storyItem}
                type="secondary"
                whiteBg
                viewVisible
                starVisible
                statusVisible
              />
              <CommentCard items={item.commentItem} />
            </div>
          ))}
        </div>
  )
}

export default RatingList

