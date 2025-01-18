import { Image } from "antd";
import BlogDetails from "../../../src/pages/BlogDetails";
import { useRouter } from "next/router";
import { useGetBlog } from "../../../src/stores/BlogStore";
import CategoriesTag from "../../../src/components/CategoriesTag";
import ArticleTitle from "../../../src/components/ArticleTitle";

const BlogDetail = ({}) => {
  const router = useRouter();

  const blogId = router.query.id;

  const { blog } = useGetBlog({ blogId });

  return (
    <div className="bg-white">
      <div className="max-w-[1176px] mx-auto flex-col justify-center mt-6 px-2.5 bg-white">
        <div className="relative aspect-16/9 w-full sm:aspect-12/5">
          <div className="relative rounded-xl overflow-hidden aspect-16/9 sm:aspect-12/5">
            <Image preview={false} src={blog?.coverImage || ""} />
            <div className="absolute inset-0 bg-black/60 sm:bg-transparent" />
          </div>
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

export default BlogDetail;
