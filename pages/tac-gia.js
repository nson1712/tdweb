import React from "react";
import AuthorComponent from "../src/pages/Author";
import HeaderServer from "../src/components/HeaderServer";

const Library = () => {
  return (
    <>
      <HeaderServer description="Trang thông tin Điều khoản và Chính sách dành riêng cho Tác Giả/ Dịch Giả/ Nhóm Dịch trên nền tảng Toidoc" />
      <AuthorComponent />
    </>
  );
};

export default Library;
