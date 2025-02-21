import React from "react";
import UnfinishedStoryDetailItem from "./UnfinishedStoryDetailItem";
import { observer } from "mobx-react";

const UnfinishedStoryItem = ({ unfinishedStory }) => {
  return (
    <div className="flex flex-col gap-y-4">
      <UnfinishedStoryDetailItem
        readingPercent={unfinishedStory?.readingPercent}
        title={unfinishedStory?.title}
        coverImage={unfinishedStory?.coverImage}
        currentChapterOrder={unfinishedStory?.currentChapterOrder}
        storySlug={unfinishedStory?.storySlug}
        chapterSlug={unfinishedStory?.chapterSlug}
      />
    </div>
  );
};

export default observer(UnfinishedStoryItem);
