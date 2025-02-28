import React from "react";

const MainCategories = ({ item }) => {
  return (
    <a className="w-fit h-fit rounded-[5px] bg-[#FFF9E5] text-[#E8B80E] font-medium text-sm leading-normal px-0.5 py-0.5" href={`/the-loai/${item?.code}`} title={`Thể loại truyện ${item?.name}`}>
      {item?.name}
    </a>
  );
};

export default MainCategories;
