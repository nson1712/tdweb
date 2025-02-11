import VerticalStoryItem from "../VerticalStoryItem/VerticalStoryItem";

const TopFull = ({ data }) => {
  return (
    <div className="grid grid-cols-4 justify-center md:grid-cols-8 md:grid-rows-2 gap-2">
      {data?.slice(0, 16).map((item, index) => (
        <VerticalStoryItem
          key={index}
          title={item.title}
          slug={item.slug}
          coverImage={item.coverImage}
        />
      ))}
    </div>
  );
};

export default TopFull;
