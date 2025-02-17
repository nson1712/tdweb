import ButtonViewAll from "../../../components/ButtonViewAll";
import Hashtag from "../../../components/Hashtag";
import Title from "./title";

const HashtagSection = ({ hashtags }) => {
  return (
    <div className="px-2 space-y-4">
      <Title />
      <div className="hidden md:block px-2">
        <div className="flex flex-wrap gap-4 justify-center">
          {hashtags?.data?.map((item) => (
            <Hashtag key={item.id} hashtag={item.name} />
          ))}
        </div>
      </div>
      <div className="block md:hidden px-1">
        <div className="flex flex-wrap gap-2 justify-center">
          {hashtags?.data?.slice(0, 14).map((item) => (
            <Hashtag key={item.id} hashtag={item.name} />
          ))}
        </div>
      </div>

      <ButtonViewAll
        className="w-full border-1 bg-[#F5F8FF] rounded-lg px-5 py-2.5 text-center me-2 mb-2 shadow-sm hover:bg-[#5C95C6] hover:transition hover:delay-50 hover:text-white cursor-pointer"
        url="/hashtag"
      />
    </div>
  );
};

export default HashtagSection;
