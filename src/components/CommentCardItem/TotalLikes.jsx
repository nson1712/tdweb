import React from "react";
import TotalLikesIcon from "../../../public/icons/TotalLikesIcon";

const TotalLikes = ({ totalLikes }) => {
  return (
    <div className="flex flex-row gap-x-0.5 max-w-fit">
      <TotalLikesIcon />
      <div className="font-medium text-[12px] text-slate-400 self-center">
        {totalLikes}
      </div>
    </div>
  );
};

export default TotalLikes;
