import Title from "./title";
import HotStories from "../../../components/HotStories";
import ButtonViewAll from "../../../components/ButtonViewAll";

const Section3 = ({ topTrending }) => {
  return (
    <div className="border-1 p-3 rounded-2xl space-y-4 mx-2">
      <Title />
      <HotStories data={topTrending?.data} />
      <ButtonViewAll
        className="w-full text-[#5C95C6] bg-[#F5F8FF] font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2 shadow-sm hover:bg-[#5C95C6] hover:transition hover:delay-50 hover:text-white"
        url="/danh-sach-truyen/trending"
      />
    </div>
  );
};

export default Section3;
