import TrendingIcon from "../../../../public/icons/TrendingIcon";

const Title = () => {
  return (
    <div className="flex gap-x-2">
      <TrendingIcon className="self-center" />
      <h2 className="text-lg sm:text-xl font-bold">Truyện đang HOT</h2>
    </div>
  );
};

export default Title;
