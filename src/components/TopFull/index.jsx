import { useEffect } from "react";
import StoryStore from "../../stores/StoryStore";
import VerticalStoryItem from "../VerticalStoryItem/VerticalStoryItem";

const TopFull = () => {
  const { topFull, getTopFull } = StoryStore;
  useEffect(() => {
    getTopFull();
  }, []);
  return (
    <div className="grid grid-cols-4 justify-center md:grid-cols-8 md:grid-rows-2 gap-2">
      {topFull.data?.slice(0, 16).map((item) => (
        <VerticalStoryItem title={item.title} coverImage={item.coverImage} />
      ))}
    </div>
  );
};

export default TopFull;
