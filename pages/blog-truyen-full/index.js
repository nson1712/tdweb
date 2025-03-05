import React from "react";
import HeaderServer from "../../src/components/HeaderServer";
import Blog from "../../src/pages/Blog";

const BlogPage = () => {
  return (
    <>
      <HeaderServer
        description="Tổng hợp danh sách các bài đánh giá, review về các truyện trên nền tảng Toidoc. Đánh giá được viết cẩn thận và phân tích dưới góc nhìn khách quan nhất."
        title="🌟Đánh giá, review truyện full đặc sắc | Webtruyen"
        canonical="https://toidoc.vn/blog-truyen-full"
      />
      <Blog />
    </>
  );
};

export default BlogPage;
