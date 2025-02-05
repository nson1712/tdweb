import React from "react";
import { calculateTotalCategories } from "../../utils/utils";

const TotalCategories = ({ totalCategories }) => {
  return (
    <div className="max-h-fit rounded-[5px] self-center text-black font-medium text-[10px] bg-slate-50 px-0.5 py-0.5">
      {calculateTotalCategories(
        totalCategories !== undefined ? totalCategories : 0
      )}
    </div>
  );
};

export default TotalCategories;
