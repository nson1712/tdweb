import React from "react";

const MainCategories = ({ mainCategories }) => {
  return (
    <div className="w-fit h-fit rounded-[5px] bg-yellow100 text-yellow font-medium text-xs leading-normal px-0.5 py-0.5">
      {mainCategories}
    </div>
  );
};

export default MainCategories;
