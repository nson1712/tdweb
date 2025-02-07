import { useEffect } from "react";
import VerticalStoryItem from "../../../components/VerticalStoryItem/VerticalStoryItem";
import StoryStore from "../../../stores/StoryStore";
import TopFull from "../../../components/TopFull";
import Title from "./title";

const Section4 = () => {
  const { topFull, getTopFull } = StoryStore;
  useEffect(() => {
    getTopFull();
  }, []);

  return (
    <div className="px-2 space-y-4">
      <Title />
      <TopFull />
    </div>
  );
};

export default Section4;
