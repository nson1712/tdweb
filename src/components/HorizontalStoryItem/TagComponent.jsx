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
    <div className="flex flex-wrap gap-x-1">
      {mainCategoriesVisible && (
        <MainCategories mainCategories={mainCategories} />
      )}
      {categoriesVisible && (
        <>
          {categories?.map((item, index) => (
            <Categories key={index} categories={item} />
          ))}
        </>
      )}
      {totalCategoriesVisible && (
        <TotalCategories totalCategories={totalCategories} />
      )}
    </div>
  );
};

export default TagComponent;
