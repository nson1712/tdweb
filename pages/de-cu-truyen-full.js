import React from "react";
import HomepageComponent from "../src/pages/Homepage";
import HeaderServer from "../src/components/HeaderServer";

const StoryType = () => {
  return (
    <>
      <HeaderServer
        description="Danh sách truyện full được đề cử bởi Toidoc. Truyện luôn được cập nhật mới nhất và nhanh nhất."
        canonical="https://toidoc.vn/the-loai"
      />
      <HomepageComponent />
    </>
  );
};

export default StoryType;
