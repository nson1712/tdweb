import VerticalStoryItem from "./VerticalStoryItem";

const VerticalStory = ({ items }) => {
  const convertedItems = Array.isArray(items) ? items : [items];
  return (
    <div>
      {convertedItems.map((item) => (
        <VerticalStoryItem
          key={item.id}
          id={item.id}
          title={item.title}
          thumbnail={item.thumbnail}
        />
      ))}
    </div>
  );
};

export default VerticalStory;
