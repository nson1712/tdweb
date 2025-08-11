import Image from "next/image";
import imageLoader from "../../loader/imageLoader";
import { formatRating } from "../../utils/storyUtils";

const StoryRating = ({ rate, className = "text-white" }) => {
  return (
    <div className="flex gap-x-0.5">
      <div className="h-3 w-3 flex self-center -mt-0.5">
        <Image
          className="aspect-square"
          src="/images/star-icon.png"
          width={12}
          height={12}
          alt="star-icon"
          loader={imageLoader}
        />
      </div>
      <div className={`text-xs self-center ${className}`}>
        {formatRating(rate)}
      </div>
    </div>
  );
};

export default StoryRating; 