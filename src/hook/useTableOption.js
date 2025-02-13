import { RightOutlined } from "@ant-design/icons";
import {
  calculateCreatedTime,
  getSlugfromSlugGenerate,
  slugGenerate,
} from "../utils/utils";

export const useTableOptions = () => {
  const newStoryColumns = [
    {
      title: "Tên truyện",
      dataIndex: "title",
      key: "title",
      width: "60%",
      render: (item) => (
        <a
          href={`/${getSlugfromSlugGenerate(slugGenerate(item))}`}
          title={item}
          className="text-black font-bold line-clamp-1 cursor-pointer"
        >
          <RightOutlined /> {item}
        </a>
      ),
    },
    {
      title: "Thể loại",
      dataIndex: "categories",
      key: "categories",
      width: "25%",
      render: (item) => (
        <div className="line-clamp-1 text-gray-500 font-medium cursor-pointer">
          {item?.join(", ")}
        </div>
      ),
    },
    {
      title: "Ngày ra",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "15%",
      render: (item) => (
        <div className="line-clamp-1 text-gray-500 font-medium cursor-pointer">
          {calculateCreatedTime(item)}
        </div>
      ),
    },
  ];

  return {
    newStoryColumns,
  };
};
