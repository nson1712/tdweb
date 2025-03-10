import Title from "./title";
import HotStories from "../../../components/HotStories";
import ButtonViewAll from "../../../components/ButtonViewAll";

const Section3 = ({ topTrending }) => {
  return (
    <div className="border-1 p-2 rounded-2xl space-y-6 mx-2">
      <Title />
      <HotStories className="grid grid-cols-4 justify-center md:grid-cols-8 md:grid-rows-2 gap-x-2 gap-y-6" data={topTrending?.data?.slice(0,16)} />
      <div className="flex">
        <ButtonViewAll
          className="w-full border-1 text-[#5C95C6] bg-[#F5F8FF] font-medium rounded-lg text-base px-5 py-2.5 text-center shadow-sm hover:bg-[#5C95C6] hover:transition hover:delay-50 hover:!text-white cursor-pointer"
          url="/danh-sach-truyen/trending"
          title="Xem thêm danh sách truyện đang HOT"
        />
      </div>
    </div>
  );
};

export default Section3;
