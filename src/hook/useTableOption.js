import { RightOutlined } from "@ant-design/icons";
import { calculateCreatedTime } from "../utils/utils";
import Link from "next/link";

export const useTableOptions = () => {
  const newStoryColumns = [
    {
      title: "Tên truyện",
      dataIndex: "title",
      key: "title",
      width: "60%",
      render: (_, record) => (
        <Link href={`/${record.slug}`} passHref>
          <a
            title={record.title}
            className="text-black font-bold line-clamp-1 cursor-pointer hover:!text-blue-500"
          >
            <RightOutlined /> {record.title}
          </a>
        </Link>
      ),
    },
    {
      title: "Thể loại",
      dataIndex: "categories",
      key: "categories",
      width: "25%",
      responsive: ["sm"],
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
