import TrendingIcon from "../../../../public/icons/TrendingIcon";

const Title = () => {
  return (
    <div className="flex gap-x-2">
      <TrendingIcon className="self-center" />
      <div className="text-lg sm:text-xl font-bold">Top mới nổi</div>
    </div>
  );
};

export default Title;
