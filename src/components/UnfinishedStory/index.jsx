import UnfinishedStoryItem from "./UnfinishedStoryItem";

const UnfinishedStory = ({ items }) => {
  return (
    <div key="unfinished-story">
      {items.map((item, index) => (
        <UnfinishedStoryItem
          key={item.id || index}
          unfinishedStory={item.unfinishedStory}
        />
      ))}
    </div>
  );
};

export default UnfinishedStory;
