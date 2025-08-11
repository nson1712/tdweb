import VerticalStoryItem from "../VerticalStoryItem/VerticalStoryItem";

const HotStories = ({ data, className }) => {
  return (
    <div className={className}>
      {data?.slice(0, 15).map((item, index) => (
        <VerticalStoryItem
          key={index}
          title={item.title}
          slug={item.slug}
          coverImage={item.thumbnail || item.coverImage}
          status={item.status}
          rate={item.rate}
          totalView={item.totalView}
          totalLike={item.totalLike}
          mainCategories={item.mainCategories}
        />
      ))}

      <div className="hidden sm:block">
        {data?.slice(15, 16).map((item, index) => (
          <VerticalStoryItem
            key={index}
            title={item.title}
            slug={item.slug}
            coverImage={item.thumbnail || item.coverImage}
            status={item.status}
            rate={item.rate}
            totalView={item.totalView}
            totalLike={item.totalLike}
            mainCategories={item.mainCategories}
          />
        ))}
      </div>
    </div>
  );
};

export default HotStories;
