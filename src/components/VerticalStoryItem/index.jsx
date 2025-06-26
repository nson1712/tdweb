import VerticalStoryItem from "./VerticalStoryItem";

const VerticalStory = ({ items }) => {
  const convertedItems = Array.isArray(items) ? items : [items];
  return (
    <div>
      {convertedItems.map((item, index) => (
        <VerticalStoryItem
          key={index}
          id={item?.id || index}
          title={item?.title}
          coverImage={item?.thumbnail || item?.coverImage}
          slug={item?.slug}
          status={item?.status}
          rate={item.rate}
          totalView={item.totalView}
        />
      ))}
    </div>
  );
};

export default VerticalStory;
