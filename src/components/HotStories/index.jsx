import VerticalStoryItem from "../VerticalStoryItem/VerticalStoryItem";

const HotStories = ({ data, className }) => {
  return (
    <div className={className}>
      {data?.map((item, index) => (
        <VerticalStoryItem
          key={index}
          title={item.title}
          slug={item.slug}
          coverImage={item.thumbnail || item.coverImage}
          status={item.status}
          rate={item.rate}
          totalView={item.totalView}
        />
      ))}
    </div>
  );
};

export default HotStories;
