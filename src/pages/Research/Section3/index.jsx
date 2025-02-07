import { useEffect } from "react";
import HorizontalStory from "../../../components/HorizontalStoryItem";
import StoryStore from "../../../stores/StoryStore";
import { Spin } from "antd";
import uuid from "react-uuid";
import CommunityIcon from "../../../../public/icons/CommunityIcon";

const Section3 = () => {
  const { hotStories, getHotStories, topFull, getTopFull, topNew, getTopNew } =
    StoryStore;
  useEffect(() => {
    getHotStories();
    getTopFull();
    getTopNew();
  }, []);

  return (
    <div className="border-1 p-3 rounded-2xl space-y-4 mx-2">
      <div className="flex gap-x-2">
        <CommunityIcon />
        <div className="text-lg font-semibold">Top mới nổi</div>
      </div>
      <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:grid-rows-3 md:gap-4">
        {hotStories?.data?.slice(0, 9).map((item) => (
          <HorizontalStory
            key={uuid()}
            items={item}
            whiteBg
            viewVisible
            starVisible
            statusVisible
            tagVisible
          />
        ))}
      </div>
    </div>
  );
};

export default Section3;
