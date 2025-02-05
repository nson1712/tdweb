import React from "react";
import HorizontalStoryItem from "./HorizontalStoryItem";

const HorizontalStory = ({ items }) => {
  return (
    <div className="max-w-auto flex flex-row rounded-t-2xl gap-x-4">
      {items.map((item) => (
        <HorizontalStoryItem
          key={item.id}
          id={item.id}
          title={item.title}
          thumbnail={item.thumbnail}
          starRate={item.starRate}
          status={item.status}
          totalView={item.totalView}
          totalCategories={item.totalCategories}
          categories={item.categories}
          mainCategories={item.mainCategories}
          tagVisible={item.tagVisible}
          viewVisible={item.viewVisible}
          statusVisible={item.statusVisible}
          starVisible={item.starVisible}
          categoriesVisible={item.categoriesVisible}
          mainCategoriesVisible={item.mainCategoriesVisible}
          totalCategoriesVisible={item.totalCategoriesVisible}
          secondary={item.secondary}
          primary={item.primary}
          goldenTicketPercent={item.goldenTicketPercent}
          goldenTicketVisible={item.goldenTicketVisible}
          hasBackground={item.hasBackground}
        />
      ))}
    </div>
  );
};

export default HorizontalStory;
