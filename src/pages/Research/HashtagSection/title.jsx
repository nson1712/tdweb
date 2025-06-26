import HashtagIcon from "../../../../public/icons/HashtagIcon";

const Title = () => {
  return (
    <div className="flex gap-x-2">
      {/*<HashtagIcon className="self-center" />*/}
      <img src='/images/icon-hashtag.png' className='w-[24px] h-[24px]' />
      <div className="text-lg sm:text-xl font-bold">Hashtag Nổi Bật</div>
    </div>
  );
};

export default Title;
