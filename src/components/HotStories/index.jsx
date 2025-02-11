import HorizontalStory from "../HorizontalStoryItem";

const HotStories = ({ data }) => {
  return (
    <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:grid-rows-3 md:gap-4">
      {data?.slice(0, 9).map((item, index) => (
        <HorizontalStory
          key={index}
          items={item}
          whiteBg
          viewVisible
          starVisible
          statusVisible
          tagVisible
          categoriesVisible
          mainCategoriesVisible
          totalCategoriesVisible
        />
      ))}
    </div>
  );
};

export default HotStories;
