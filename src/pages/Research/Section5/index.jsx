import { useEffect } from "react";
import StoryStore from "../../../stores/StoryStore";
import HorizontalStory from "../../../components/HorizontalStoryItem";
import VerticalStory from "../../../components/VerticalStoryItem";
import Title from "./title";
import { useRouter } from "next/router";
import { observer } from "mobx-react";
import ButtonViewAll from "../../../components/ButtonViewAll";

const Section5 = ({ topViews }) => {
  const router = useRouter();
  const handleViewDetail = (item) => {
    router.push(`/${item.slug}`);
  };
  console.log("TOP VIEWS: ", topViews);
  return (
    <div className="space-y-4 px-2">
      <Title />
      <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-3 gap-2">
        {topViews.data?.slice(0, 3).map((item, index) => (
          <HorizontalStory
            key={index}
            items={item}
            handleViewDetail={() => handleViewDetail(item)}
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
      <div className="grid grid-cols-4 md:grid-cols-8 gap-x-2 gap-y-6">
        {topViews.data?.slice(3, 19).map((item, index) => (
          <VerticalStory items={item} key={index} />
        ))}
      </div>
      <ButtonViewAll
        className="w-full text-[#5C95C6] bg-[#F5F8FF] font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2 shadow-sm hover:bg-[#5C95C6] hover:transition hover:delay-50 hover:text-white"
        url="/danh-sach-truyen/xem-nhieu-nhat"
      />
    </div>
  );
};

export default Section5;
