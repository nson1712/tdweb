import React from "react";
import LibraryComponent from "../src/pages/Library";
import HeaderServer from "../src/components/HeaderServer";

const Library = () => {
  return (
    <>
      <HeaderServer
        description="Nơi lưu trữ các truyện full hay mà bạn đang đọc dở hoặc đã xem, đã lưu. Bạn có thể dễ dàng truy cập vào các truyện full này một cách nhanh chóng"
        title="Thư viện Truyện Full độc đáo | Nền tảng cộng đồng đọc truyện Toidoc"
      />
      <LibraryComponent />
    </>
  );
};

export default Library;
