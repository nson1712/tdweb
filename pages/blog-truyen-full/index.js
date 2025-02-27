import React from "react";
import HeaderServer from "../../src/components/HeaderServer";
import Blog from "../../src/pages/Blog";

const BlogPage = () => {
  return (
    <>
      <HeaderServer
        description="Tổng hợp danh sách các bài viết đánh giá, review về các truyện trên nền tảng Toidoc. Các bài đánh giá được viết cẩn thận và phân tích dưới góc nhìn khách quan nhất."
        title="🌟Đánh giá, review truyện đặc sắc  | Nền tảng cộng đồng đọc truyện Online Toidoc"
        canonical="https://toidoc.vn/blog-truyen-full"
      />
      <Blog />
    </>
  );
};

export default BlogPage;
