import { ClockCircleOutlined } from "@ant-design/icons";
import { Image } from "antd";
import { DateTime } from "luxon";
import Link from "next/link";
import UnderLineTitle from "../../components/UnderLineTitle/UnderLineTitle";
import BlogImageLink from "../../components/BlogImageLink";
import { useRouter } from "next/router";
import BlogTitleLink from "../../components/BlogTitle";

const RelatedBlog = ({ relatedBlogList }) => {
  const router = useRouter()
  return (
    <>
      <UnderLineTitle title="Bài đăng khác" />
      <div className="sm:grid sm:grid-cols-2 sm:grid-rows-3 gap-2">
        {relatedBlogList.map((item, index) => (
          <div className="flex gap-x-2" key={index}>
            <div className="relative block aspect-16/9 w-full max-w-[35%] flex-shrink-0 rounded-md">
              {/* <Image
                className="rounded-md"
                src={item?.coverImage || ""}
                preview={false}
              /> */}
              <BlogImageLink item={item} router={router} />
            </div>
            <div>
              {/* <Link
                href={{
                  pathname: `${item.slug}`,
                  query: {
                    id: item.id,
                  },
                }}
                // as={`${item.slug}`}
              >
                <div className="text-xs sm:text-sm font-[500] line-clamp-2 cursor-pointer hover:text-blue-600 transition delay-75">
                  {item.title}
                </div>
              </Link> */}
              <BlogTitleLink item={item} router={router} />
              <div className="text-xs">
                <ClockCircleOutlined />{" "}
                {DateTime.fromMillis(item.createdAt ?? 0).toFormat(
                  "dd/MM/yyyy HH:mm"
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RelatedBlog;
