import { useEffect } from "react";
import StoryStore from "../../../stores/StoryStore";
import Title from "./title";
import HotStories from "../../../components/HotStories";

const Section3 = () => {
  const { topTrending, getTopTrending } = StoryStore;
  useEffect(() => {
    getTopTrending();
  }, []);
  const handleRefreshData = () => {
    getTopTrending();
  };
  return (
    <div className="border-1 p-3 rounded-2xl space-y-4 mx-2">
      <Title handleRefreshData={handleRefreshData} />
      
      <HotStories data={topTrending?.data} />
      
    </div>
  );
};

export default Section3;
