import MostVIewIcon from "../../../../public/icons/MostVIewIcon";

const Title = () => {
  return (
    <div className="flex gap-2">
      {/*<MostVIewIcon />*/}
      <img src='/images/icon-top-view.png' className='w-[24px] h-[24px]' />
      <div className="text-lg sm:text-xl font-bold">Top Xem Nhiều 7 Ngày Qua</div>
    </div>
  );
};

export default Title;
