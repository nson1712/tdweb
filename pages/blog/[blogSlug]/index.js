import { BookOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Image } from "antd";
import BlogDetails from "../../../src/pages/BlogDetails";

const BlogDetail = ({}) => {
  const data = {
    title: "ghehe",
  };
  return (
    <div className="max-w-[1176px] mx-auto flex-col justify-center mt-6 px-2.5">
      <div>
        <Breadcrumb
          items={[
            {
              href: "https://toidoc.vn/blog",
              title: <HomeOutlined />,
            },
            {
              href: `https://toidoc.vn/blog/${data?.slug}`,
              title: (
                <>
                  <BookOutlined />
                  <span>{data?.slug}</span>
                </>
              ),
            },
          ]}
        />
      </div>

      <Image
        className="self-center rounded-lg  w-full"
        preview={false}
        src="https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <div className="block sm:hidden text-lg text-white -mt-24 mb-2 relative font-semibold pl-1">
        Phá sóng karaoke: có nên hay không nhỉ hah ah ah ha hah a ah hah ah ah a?
      </div>
      <BlogDetails />
    </div>
  );
};

export default BlogDetail;
