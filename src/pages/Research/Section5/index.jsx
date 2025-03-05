import HorizontalStory from "../../../components/HorizontalStoryItem";
import VerticalStory from "../../../components/VerticalStoryItem";
import Title from "./title";
import ButtonViewAll from "../../../components/ButtonViewAll";

const Section5 = ({ topViews }) => {

  return (
    <div className="space-y-8 px-3">
      <Title />
      <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 gap-3">
        {topViews.data?.slice(0, 3).map((item, index) => (
          <HorizontalStory
            key={index}
            items={item}
            starVisible
            statusVisible
            tagVisible
            viewVisible
            categoriesVisible
            mainCategoriesVisible
            totalCategoriesVisible
            whiteBg
          />
        ))}
      </div>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-x-4 gap-y-6">
        {topViews.data?.slice(3, 19).map((item, index) => (
          <VerticalStory items={item} key={index} />
        ))}
      </div>
      <div className="flex">
        <ButtonViewAll
          className="w-full border-1 text-[#5C95C6] bg-[#F5F8FF] font-medium rounded-lg text-base px-5 py-2.5 text-center shadow-sm hover:bg-[#5C95C6] hover:transition hover:delay-50 hover:!text-white cursor-pointer"
          url="/danh-sach-truyen/xem-nhieu-nhat"
          title="Xem thêm danh sách truyện được đọc nhiều"
        />
      </div>
    </div>
  );
};

export default Section5;
