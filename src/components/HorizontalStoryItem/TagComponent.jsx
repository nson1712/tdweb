import React from "react";
import MainCategories from "./MainCategories";
import Categories from "./Categories";
import TotalCategories from "./TotalCategories";

const TagComponent = ({
  mainCategories,
  categories,
  categoriesVisible,
  mainCategoriesVisible,
  totalCategories,
  totalCategoriesVisible,
}) => {
  return (
    <div className="flex flex-wrap gap-1">
      {mainCategoriesVisible && (
        <>
          {mainCategories?.map((item, index) => (
            <MainCategories key={index} item={item} />
          ))}
        </>
      )}
      {categoriesVisible && (
        <>
          {categories?.map((item, index) => (
            <Categories key={index} item={item} />
          ))}
        </>
      )}
      {totalCategoriesVisible && totalCategories > 2 && (
        <TotalCategories totalCategories={totalCategories} />
      )}
    </div>
  );
};

export default TagComponent;
