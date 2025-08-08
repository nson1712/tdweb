import BlogDetails from "../../../src/pages/BlogDetails";
import CategoriesTag from "../../../src/components/CategoriesTag";
import ArticleTitle from "../../../src/components/ArticleTitle";
import Image from "next/image";
import imageLoader from "../../../src/loader/imageLoader";
import axios from "axios";
import HeaderServer from "../../../src/components/HeaderServer";

const BlogDetailPage = ({ detail }) => {
  return (
    <>
      <HeaderServer
        title={`🔥${detail?.title}`}
        canonical={`https://toidoc.vn/blog-truyen-full/${detail?.slug}`}
        slug={detail?.slug}
        description={detail?.metaDescription}
        keywords={detail?.metaKeywords}
        image={detail?.coverImage}
      />
      <div className="bg-white">
        <div className="max-w-[1176px] mx-auto flex-col justify-center mt-6 px-2.5 bg-white">
          <div className="relative rounded-3xl overflow-hidden aspect-16/9 sm:aspect-12/2 sm:mt-24">
            {detail?.coverImage ? (
              <Image
                loader={imageLoader}
                height={920}
                width={1780}
                src={detail?.coverImage || "/default.jpg"}
                alt={detail?.slug}
                priority
              />
            ) : null}
            <div className="absolute inset-0 bg-black/60 sm:bg-transparent" />
          </div>
          <div className="block sm:hidden text-lg text-white -mt-32 mb-2 relative font-semibold px-1.5">
            <CategoriesTag title="Blog" />
            <ArticleTitle
              className="text-xl line-clamp-2"
              title={detail?.title}
              isH1={false}
            />
          </div>
          <BlogDetails data={detail} />
        </div>
      </div>
    </>
  );
};

BlogDetailPage.getInitialProps = async (ctx) => {
  const getDetail = async () => {
    try {
      if (ctx.query.blogSlug) {
        const result = await axios.get(
          typeof window !== "undefined"
            ? `https://fsdfssf.truyenso1.xyz/data/article/detail/${ctx.query.blogSlug}`
            : `http://10.8.22.37:8082/article/detail/${ctx.query.blogSlug}`
        // `https://fsdfssf.truyenso1.xyz/data/article/detail/${ctx.query.blogSlug}`
        // typeof window !== "undefined"
        //     ? `https://uatapi.truyenso1.xyz/data/article/detail/${ctx.query.blogSlug}`
        //     : `http://10.8.22.250:18111/data/article/detail/${ctx.query.blogSlug}`
        );
        return {
          detail: result.data.data,
        };
      }

      return {
        detail: {},
      };
    } catch (e) {
      console.log('server call error', e)
      return {
        detail: {},
      };
    }
  };

  return await getDetail();
};

export default BlogDetailPage;
