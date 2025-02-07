import React from "react";
import HorizontalStoryItem from "./HorizontalStoryItem";

const HorizontalStory = ({
  items,
  type,
  whiteBg,
  tagVisible,
  viewVisible,
  statusVisible,
  starVisible,
}) => {
  const convertedItems = Array.isArray(items) ? items : [items];
  return (
    <div className="flex rounded-t-2xl gap-x-4">
      {convertedItems?.map((item) => (
        <HorizontalStoryItem
          key={item.id}
          id={item.id}
          title={item.title}
          coverImage={item.coverImage || item.thumbnail}
          rate={item.rate}
          status={item.status}
          totalView={item.totalView}
          totalCategories={item.totalCategories}
          categories={item.categories}
          mainCategories={item.mainCategories}
          tagVisible={tagVisible}
          viewVisible={viewVisible}
          statusVisible={statusVisible}
          starVisible={starVisible}
          categoriesVisible={item.categoriesVisible}
          mainCategoriesVisible={item.mainCategoriesVisible}
          totalCategoriesVisible={item.totalCategoriesVisible}
          type={type}
          goldenTicketPercent={item.goldenTicketPercent}
          goldenTicketVisible={item.goldenTicketVisible}
          whiteBg={whiteBg}
        />
      ))}
    </div>
  );
};

export default HorizontalStory;
