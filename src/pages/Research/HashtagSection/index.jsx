import ButtonViewAll from "../../../components/ButtonViewAll";
import Hashtag from "../../../components/Hashtag";
import Title from "./title";

const HashtagSection = ({ hashtags }) => {
  return (
    <div className="px-3 space-y-4">
      <Title />
      <div className="hidden md:block px-2">
        <div className="flex flex-wrap gap-4 justify-center">
          {hashtags?.data?.map((item, index) => (
            <Hashtag key={item.id} hashtag={item.name} index={index}/>
          ))}
        </div>
      </div>
      <div className="block md:hidden px-1">
        <div className="flex flex-wrap gap-2 justify-center">
          {hashtags?.data?.slice(0, 14).map((item, index) => (
            <Hashtag key={item.id} hashtag={item.name} index={index}/>
          ))}
        </div>
      </div>

      <div className="flex">
        <ButtonViewAll
          className="w-full border-1 text-[#5C95C6] bg-[#F5F8FF] font-medium rounded-lg text-base px-5 py-2.5 text-center shadow-sm hover:bg-[#5C95C6] hover:transition hover:delay-50 hover:!text-white cursor-pointer"
          url="/hashtag"
          title="Xem thêm danh sách thể loại truyện theo hashtag"
        />
      </div>
    </div>
  );
};

export default HashtagSection;
