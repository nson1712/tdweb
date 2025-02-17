import UnfinishedStoryItem from "./UnfinishedStoryItem";

const UnfinishedStory = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <UnfinishedStoryItem
          key={item.id}
          unfinishedStory={item.unfinishedStory}
        />
      ))}
    </div>
  );
};

export default UnfinishedStory;
