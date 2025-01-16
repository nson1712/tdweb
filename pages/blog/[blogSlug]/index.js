import { BookOutlined, HomeTwoTone } from "@ant-design/icons";
import { Breadcrumb, ConfigProvider, Image } from "antd";
import BlogDetails from "../../../src/pages/BlogDetails";
import { useRouter } from "next/router";
import { useGetBlog } from "../../../src/stores/BlogStore";

const BlogDetail = ({}) => {
  const router = useRouter();

  const blogId = router.query.id;

  const { blog } = useGetBlog({ blogId });

  const homeNodeLabel = (
    <div className="flex gap-x-1.5 px-2 py-1 bg-slate-100 rounded-2xl hover:bg-red">
      <HomeTwoTone />{" "}
      <div className="text-slate-600 font-medium">Trang chủ</div>
    </div>
  );
  const currentNodeLabel = (
    <div className="flex gap-x-1.5 px-2 py-1">
      <BookOutlined />{" "}
      <div className="text-slate-600 font-medium">{blog?.slug}</div>
    </div>
  );

  return (
    <div className="max-w-[1176px] mx-auto flex-col justify-center mt-6 px-2.5">
      {/* <div className="mb-2">
        <ConfigProvider
          theme={{
            components: {
              Breadcrumb: {
                colorBgTextHover: "transparent",
              },
            },
          }}
        >
          <Breadcrumb
            items={[
              {
                href: "https://toidoc.vn/blog",
                title: homeNodeLabel,
              },
              {
                href: `https://toidoc.vn/blog/${blog?.id}`,
                title: currentNodeLabel,
              },
            ]}
          />
        </ConfigProvider>
      </div> */}

      <div className="relative aspect-16/9 w-full sm:aspect-12/5">
        <div className="relative rounded-xl overflow-hidden aspect-16/9 sm:aspect-12/5">
          <Image preview={false} src={blog?.coverImage || ""} />
          <div className="absolute inset-0 bg-black/60 sm:bg-transparent" />
        </div>
      </div>
      <div className="block sm:hidden text-lg text-white -mt-24 mb-2 relative font-semibold pl-1">
        Định lý Cosin trong tam giác và hệ quả của định lý Cosin
      </div>
      <BlogDetails data={blog} />
    </div>
  );
};

export default BlogDetail;
