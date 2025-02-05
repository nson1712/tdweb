import Router from "next/router";
import CategoryItem from "../CategoryItem";
import { DownOutlined } from "@ant-design/icons";
import { Button } from "antd";

const HotCategories = ({ data }) => {
  const handleViewAll = () => {
    Router.push("/the-loai");
  };

  const handleItemClick = (item) => {
    console.log("ITEM: ", item)
    Router.push(`/the-loai/${item.code}`);
  };
  return (
    <div className="py-2 space-y-4">
      <div className="text-xl font-bold pt-3 md:pl-6">
        Thể loại nổi bật
      </div>

      <div className="flex flex-wrap sm:grid-rows-4 gap-2 rounded-2xl justify-center sm:hidden">
        {data.slice(0, 9).map((item) => (
          <CategoryItem
            handleItemClick={() => Router.push(`/the-loai/${item.code}`)}
            name={item.name}
            thumbnail={item.image}
          />
        ))}
      </div>

      <div className="hidden sm:flex flex-wrap sm:grid-rows-4 gap-2 rounded-2xl justify-center">
        {data.slice(0, 15).map((item) => (
          <CategoryItem
          handleItemClick={() => Router.push(`/the-loai/${item.code}`)}
            name={item.name}
            thumbnail={item.image}
          />
        ))}
      </div>

      <div className="w-full flex justify-center">
        <Button
          className="text-base font-semibold cursor-pointer"
          type="default"
          color="blue"
          onClick={handleViewAll}
        >
          Xem Thêm <DownOutlined className="mt-0.5" />
        </Button>
      </div>
    </div>
  );
};

export default HotCategories;
