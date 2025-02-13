import VerticalStoryItem from "./VerticalStoryItem";

const VerticalStory = ({ items }) => {
  const convertedItems = Array.isArray(items) ? items : [items];
  return (
    <div>
      {convertedItems.map((item, index) => (
        <VerticalStoryItem
          key={index}
          id={item.id}
          title={item.title}
          coverImage={item.thumbnail || item.coverImage}
          slug={item.slug}
        />
      ))}
    </div>
  );
};

export default VerticalStory;
