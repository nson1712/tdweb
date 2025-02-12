import Router from "next/router";
import CategoryItem from "../CategoryItem";
import { DownOutlined } from "@ant-design/icons";
import { Button } from "antd";
import ButtonViewAll from "../ButtonViewAll";

const HotCategories = ({ data }) => {
  const handleViewAll = () => {
    Router.push("/the-loai");
  };

  return (
    <div className="py-2 space-y-4">
      <div className="text-xl font-bold pt-3 md:pl-6">Thể loại nổi bật</div>

      <div className="flex flex-wrap sm:grid-rows-4 gap-2 rounded-2xl justify-center sm:hidden">
        {data.slice(0, 9).map((item, index) => (
          <CategoryItem
            key={index}
            handleItemClick={() => Router.push(`/the-loai/${item.code}`)}
            name={item.name}
            thumbnail={item.image}
          />
        ))}
      </div>

      <div className="hidden sm:flex flex-wrap sm:grid-rows-4 gap-2 rounded-2xl justify-center">
        {data.slice(0, 15).map((item, index) => (
          <CategoryItem
            key={index}
            handleItemClick={() => Router.push(`/the-loai/${item.code}`)}
            name={item.name}
            thumbnail={item.image}
          />
        ))}
      </div>

      {/* <div className="w-full flex justify-center">
        <Button
          className="text-base font-semibold cursor-pointer"
          type="default"
          color="blue"
          onClick={handleViewAll}
        >
          Xem Thêm <DownOutlined className="mt-0.5" />
        </Button>
      </div> */}
      <ButtonViewAll
        className="w-full border-1 text-[#5C95C6] bg-[#F5F8FF] font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2 shadow-sm hover:bg-[#5C95C6] hover:transition hover:delay-50 hover:text-white"
        url="/the-loai"
      />
    </div>
  );
};

export default HotCategories;
