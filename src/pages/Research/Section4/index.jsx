import Title from "./title";
import TopFull from "../../../components/TopFull";
import ButtonViewAll from "../../../components/ButtonViewAll";

const Section4 = ({ topFull }) => {
  return (
    <div className="px-2 space-y-4">
      <Title />
      <TopFull data={topFull?.data} />
      <div className="flex">
        <ButtonViewAll
          className="w-full border-1 text-[#5C95C6] bg-[#F5F8FF] font-medium rounded-lg text-base px-5 py-2.5 text-center shadow-sm hover:bg-[#5C95C6] hover:transition hover:delay-50 hover:!text-white cursor-pointer"
          url="/danh-sach-truyen/truyen-full"
        />
      </div>
    </div>
  );
};

export default Section4;
