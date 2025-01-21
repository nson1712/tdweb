import BlogDetails from "../../../src/pages/BlogDetails";
import { useGetBlog } from "../../../src/stores/BlogStore";
import CategoriesTag from "../../../src/components/CategoriesTag";
import ArticleTitle from "../../../src/components/ArticleTitle";
import { useEffect, useState } from "react";
import Image from "next/image";
// import { Image } from "antd";

const BlogDetailPage = ({}) => {
  // const blogId = router.query.id;
  const { blog } = useGetBlog();

  console.log("BLOG: ", blog)
  return (
    <div className="bg-white">
      <div className="max-w-[1176px] mx-auto flex-col justify-center mt-6 px-2.5 bg-white">
          <div className="relative rounded-3xl overflow-hidden aspect-16/9 sm:aspect-12/2 sm:mt-24">
            <Image height={920} width={1780} src={blog?.coverImage || "/default.jpg"} alt="blog image" />
            <div className="absolute inset-0 bg-black/60 sm:bg-transparent" />
          </div>
        <div className="block sm:hidden text-lg text-white -mt-32 mb-2 relative font-semibold px-1.5">
          <CategoriesTag title="blog" />
          <ArticleTitle title={blog?.title} />
        </div>
        <BlogDetails data={blog} />
      </div>
    </div>
  );
};

//getInitialProps

export default BlogDetailPage;
