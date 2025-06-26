import CompleteBookmarkIcon from "../../../../public/icons/CompleteBookmarkIcon";

const Title = () => {
  return (
    <div className="w-full flex justify-between">
      <div className="flex gap-x-2">
        <CompleteBookmarkIcon className="self-center" />
        <div className="text-lg sm:text-xl font-bold">Truyện Hoàn Mới Nhất</div>
      </div>
    </div>
  );
};

export default Title;
