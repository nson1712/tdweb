import CompleteBookmarkIcon from "../../../../public/icons/CompleteBookmarkIcon";

const Title = () => {
  return (
    <div className="flex gap-x-2">
      <CompleteBookmarkIcon />
      <div className="text-lg font-semibold">Đã hoàn thành</div>
    </div>
  );
};

export default Title;
