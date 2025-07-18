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
  categoriesVisible,
  mainCategoriesVisible,
  totalCategoriesVisible,
  goldenTicketVisible,
}) => {
  const convertedItems = Array.isArray(items) ? items : [items];
  return (
    <div className="flex rounded-t-2xl gap-x-4">
      {convertedItems?.map((item, index) => (
        <HorizontalStoryItem
          key={index}
          id={item.id}
          title={item.title}
          slug={item.slug}
          coverImage={item.thumbnail || item.coverImage}
          rate={item.rate}
          status={item.status}
          totalView={item.totalView}
          totalCategories={item.categories?.length - 1}
          categories={item.categories?.slice(0, 2)}
          mainCategories={item.mainCategories?.slice(0, 2)}
          tagVisible={tagVisible}
          viewVisible={viewVisible}
          statusVisible={statusVisible}
          starVisible={starVisible}
          categoriesVisible={categoriesVisible}
          mainCategoriesVisible={mainCategoriesVisible}
          totalCategoriesVisible={totalCategoriesVisible}
          goldenTicketVisible={goldenTicketVisible}
          type={type}
          goldenTicketPercent={item.goldenTicketPercent}
          whiteBg={whiteBg}
        />
      ))}
    </div>
  );
};

export default HorizontalStory;
