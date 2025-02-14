import HashtagIcon from "../../../../public/icons/HashtagIcon";

const Title = () => {
  return (
    <div className="flex gap-x-2">
      <HashtagIcon className="self-center" />
      <div className="text-lg sm:text-xl font-bold">Hashtag nổi bật</div>
    </div>
  );
};

export default Title;
