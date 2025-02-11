import { useEffect } from "react";
import StoryStore from "../../../stores/StoryStore";
import HorizontalStory from "../../../components/HorizontalStoryItem";
import VerticalStory from "../../../components/VerticalStoryItem";
import Title from "./title";
import { useRouter } from "next/router";

const Section5 = () => {
  const { topViews, getTopViews } = StoryStore;
  const router = useRouter();
  useEffect(() => {
    getTopViews();
  }, []);

  const handleRefreshData = () => {
    getTopViews();
  };

  const handleViewDetail = (item) => {
    console.log("ITEM: ", item);
    router.push(`/${item.slug}`);
  };
  return (
    <div className="space-y-4 px-2">
      <Title handleRefreshData={handleRefreshData} />
      <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-3 gap-2">
        {topViews.data?.slice(0, 3).map((item, index) => (
          <HorizontalStory
            key={index}
            items={item}
            handleViewDetail={() => handleViewDetail(item)}
            starVisible
            statusVisible
            tagVisible
            viewVisible
            categoriesVisible
            mainCategoriesVisible
            totalCategoriesVisible
            whiteBg
          />
        ))}
      </div>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
        {topViews.data?.slice(3, 19).map((item, index) => (
          <VerticalStory items={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Section5;
