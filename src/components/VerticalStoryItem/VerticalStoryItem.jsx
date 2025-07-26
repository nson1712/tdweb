import Link from "next/link";
import { StoryConfigurationService } from "../../config/storyConfig";
import StoryCover from "../StoryCover/StoryCover";
import StoryStatus from "../StoryStatus/StoryStatus";

const VerticalStoryItem = ({
  title,
  slug,
  coverImage,
  status,
  rate,
  totalView,
  mainCategories,
  configService = new StoryConfigurationService(),
}) => {
  const config = configService;
  
  return (
    <Link href={`/${slug}`} passHref>
      <a
        title={`Truyện full ${title}`}
        className="max-w-fit flex flex-col gap-y-2 cursor-pointer hover:translate-y-[-5%] transition duration-300 relative z-5"
      >
        <StoryStatus 
          status={status} 
          activeStatus={config.getActiveStatus()} 
        />
        
        <div className="group space-y-2">
          {coverImage && (
            <StoryCover
              coverImage={coverImage}
              title={title}
              categories={mainCategories}
              maxCategories={config.getMaxCategories()}
              totalView={totalView || 0}
              rate={rate || 0}
              hotThreshold={config.getHotThreshold()}
              imageDimensions={config.getImageDimensions()}
            />
          )}
          
          <h3 className="px-[1px] m-0 story-item-title">{title}</h3>
        </div>
      </a>
    </Link>
  );
};

export default VerticalStoryItem;
