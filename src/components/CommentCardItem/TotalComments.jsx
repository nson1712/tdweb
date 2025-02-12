import React from "react";
import TotalCommentsIcon from "../../../public/icons/TotalCommentsIcon";


const TotalComments = ({ totalComment }) => {
  return (
    <div className="flex flex-row gap-x-0.5 max-w-fit">
      <TotalCommentsIcon />
      <div className="font-medium text-[12px] text-slate-400 self-center">
        {totalComment}
      </div>
    </div>
  );
};

export default TotalComments;
