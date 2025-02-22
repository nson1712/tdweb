import { ClockCircleOutlined } from "@ant-design/icons";
import { DateTime } from "luxon";
import BlogImageLink from "../../components/BlogImageLink";
import BlogTitleLink from "../../components/BlogTitleLink";

const RelatedBlogItem = ({ item }) => {
  const formattedDate = DateTime.fromMillis(item.createdAt ?? 0).toFormat(
    "dd/MM/yyyy HH:mm"
  );

  return (
    <div className="flex gap-x-2">
      <div className="relative aspect-16/9 w-full max-w-[35%] flex-shrink-0 rounded-md">
        <BlogImageLink
          item={item}
          pathname={item.slug}
          query={{ id: item.id }}
        />
      </div>

      <div className="space-y-1">
        <BlogTitleLink
          item={item}
          className="text-black text-xs sm:text-sm font-medium line-clamp-2 cursor-pointer hover:text-blue-600 transition duration-150"
          pathname={item.slug}
        />
        <div className="text-xs flex items-center gap-1">
          <ClockCircleOutlined />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default RelatedBlogItem;
