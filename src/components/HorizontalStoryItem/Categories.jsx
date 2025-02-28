import React from "react";

const Categories = ({ item }) => {
  return (
    <a className="max-h-fit bg-[#E7EEFF] rounded-[5px] font-medium text-sm text-[#1647A4] text-center px-0.5 py-0.5"
      href={`/the-loai/${item?.code}`}
      title={`Thể loại truyện ${item?.name}`}>
      {item.name}
    </a>
  );
};

export default Categories;
