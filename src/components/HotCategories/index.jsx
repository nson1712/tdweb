import CategoryItem from "../CategoryItem";
import ButtonViewAll from "../ButtonViewAll";
import CategoryIcon from "../../../public/icons/CategoryIcon";

const HotCategories = ({ data }) => {
  return (
    <div className="py-2 space-y-4">
      <div className="flex gap-x-2">
        {/*<CategoryIcon />*/}
        <img src='/images/icon-category.png' className='w-[24px] h-[24px]' />
        <h2 className="text-lg font-bold">Thể loại nổi bật</h2>
      </div>

      <div className="grid grid-cols-3 gap-x-4 gap-y-2 rounded-2xl justify-center md:hidden">
        {data?.slice(0, 9).map((item, index) => (
          <CategoryItem
            key={index}
            name={item.name}
            thumbnail={item.image}
            code={item.code}
          />
        ))}
      </div>

      <div className="hidden md:grid md:grid-cols-5 gap-x-4 gap-y-2 rounded-2xl justify-center">
        {data?.slice(0, 15).map((item, index) => (
          <CategoryItem
            key={index}
            name={item.name}
            thumbnail={item.image}
            code={item.code}
          />
        ))}
      </div>

      <div className="flex">
        <ButtonViewAll
          className="w-full border-1 text-[#5C95C6] bg-[#F5F8FF] font-medium rounded-lg text-base py-2.5 text-center shadow-sm hover:bg-[#5C95C6] hover:transition hover:delay-50 hover:!text-white cursor-pointer"
          url="/the-loai"
          title="Xem thêm danh sách thể loại truyện"
        />
      </div>
    </div>
  );
};

export default HotCategories;
