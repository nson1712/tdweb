import Router from "next/router";
import CategoryItem from "../CategoryItem";
import ButtonViewAll from "../ButtonViewAll";
import CategoryIcon from "../../../public/icons/CategoryIcon";

const HotCategories = ({ data }) => {
  return (
    <div className="py-2 space-y-4">
      <div className="text-lg font-bold pt-3 md:pl-6 flex gap-x-2">
        <CategoryIcon />
        Thể loại nổi bật
      </div>

      <div className="flex flex-wrap sm:grid-rows-4 gap-2 rounded-2xl justify-center sm:hidden">
        {data.slice(0, 9).map((item, index) => (
          <CategoryItem
            key={index}
            // handleItemClick={() => Router.push(`/the-loai/${item.code}`)}
            name={item.name}
            thumbnail={item.image}
            code={item.code}
          />
        ))}
      </div>

      <div className="hidden sm:flex flex-wrap sm:grid-rows-4 gap-2 rounded-2xl justify-center">
        {data.slice(0, 15).map((item, index) => (
          <CategoryItem
            key={index}
            // handleItemClick={() => Router.push(`/the-loai/${item.code}`)}
            name={item.name}
            thumbnail={item.image}
            code={item.code}
          />
        ))}
      </div>

      <ButtonViewAll
        className="w-full border-1 text-[#5C95C6] bg-[#F5F8FF] font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2 shadow-sm hover:bg-[#5C95C6] hover:transition hover:delay-50 hover:text-white cursor-pointer"
        url="/the-loai"
      />
    </div>
  );
};

export default HotCategories;
