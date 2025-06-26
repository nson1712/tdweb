import TrendingIcon from "../../../../public/icons/TrendingIcon";

const Title = () => {
  return (
    <div className="flex gap-x-2">
      {/*<TrendingIcon className="self-center" />*/}
      <img src='/images/icon-hot.png' className='w-[24px] h-[24px]' />
      <h2 className="text-lg sm:text-xl font-bold">Truyện Hot Tuần Qua</h2>
    </div>
  );
};

export default Title;
