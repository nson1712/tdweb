import { ClockCircleOutlined } from "@ant-design/icons";
import { cleanHtml } from "../../utils/utils";
import { DateTime } from "luxon";

const BlogShortDescription = ({ item }) => {
  return (
    <>
      <div
        className={`sm:line-clamp-2 ${
          item.isVisible ? "block" : "hidden"
        } w-full text-slate-600`}
      >
        {cleanHtml(item.shortDescription)}
      </div>
      <div>
        <ClockCircleOutlined />{" "}
        {item.createdAt
          ? DateTime.fromISO(item.createdAt).toFormat("dd/MM/yyyy HH:mm")
          : ""}
      </div>
    </>
  );
};

export default BlogShortDescription;
