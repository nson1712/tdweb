import React from "react";

const Categories = ({ categories }) => {
  return (
    <div className="max-h-fit bg-blue100 rounded-[5px] font-medium text-[12px] text-blue text-center px-0.5 py-0.5">
      {categories}
    </div>
  );
};

export default Categories;
