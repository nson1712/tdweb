import UnfinishedStoryItem from "./UnfinishedStoryItem";

const UnfinishedStory = ({ items }) => {
  return (
    <div className="sm:order-2 sm:col-span-5 md:col-span-4">
      {items.map((item) => (
        <UnfinishedStoryItem
          key={item.id}
          totalReadingStory={item.totalReadingStory}
          unfinishedStory={item.unfinishedStory}
        />
      ))}
    </div>
  );
};

export default UnfinishedStory;
