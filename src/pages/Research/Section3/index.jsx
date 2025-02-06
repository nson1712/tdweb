import { useEffect } from "react";
import HorizontalStory from "../../../components/HorizontalStoryItem";
import StoryStore from "../../../stores/StoryStore";
import { Spin } from "antd";

const Section3 = () => {
  const { hotStories, getHotStories } = StoryStore;
  useEffect(() => {
    getHotStories();
  }, []);
  console.log("HOT STORIES: ", hotStories);
  return (
    <>
      {/* {hotStories ? (
        (hotStories || [])?.map((item) => {
          <HorizontalStory
            items={item}
            whiteBg
            viewVisible
            starVisible
            statusVisible
          />;
        })
      ) : (
        <Spin spinning={true} />
      )} */}
      aaa
    </>
  );
};

export default Section3;
