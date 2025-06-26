import Title from "./title";
import TopFull from "../../../components/TopFull";
import ButtonViewAll from "../../../components/ButtonViewAll";
import { toJS } from "mobx";

const Section4 = ({ topFull }) => {
  return (
    <div className="px-3 space-y-8">
      <Title />
      <TopFull data={topFull?.data} />
      <div className="flex">
        <ButtonViewAll
          className="w-full border-1 text-[#5C95C6] bg-[#F5F8FF] font-medium rounded-lg text-base px-5 py-2.5 text-center shadow-sm hover:bg-[#5C95C6] hover:transition hover:delay-50 hover:!text-white cursor-pointer"
          url="/danh-sach-truyen/truyen-full"
          title="Xem thêm danh sách truyện full đã hoàn"
        />
      </div>
    </div>
  );
};

export default Section4;
