import Image from "next/image";
import imageLoader from "../../loader/imageLoader";
import TotalView from "../TotalView";
import StoryRating from "../StoryRating/StoryRating";
import { shouldShowHotBadge } from "../../utils/storyUtils";

const StoryStats = ({ totalView, rate, hotThreshold, className = "text-white" }) => {
  const isHot = shouldShowHotBadge(totalView, hotThreshold);

  return (
    <div className="flex gap-x-4 sm:gap-x-10">
      <StoryRating rate={rate} className={className} />
      <div className="self-center">
        {isHot ? (
          <div className="flex gap-x-1">
            <Image
              src="/images/icon-hot.png"
              width={12}
              height={12}
              alt="hot-icon"
              loader={imageLoader}
            />
            <div className="text-xs text-white">HOT</div>
          </div>
        ) : (
          <TotalView totalView={totalView} className={className} />
        )}
      </div>
    </div>
  );
};

export default StoryStats; 