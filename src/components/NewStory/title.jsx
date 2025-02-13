import NewIcon from "../../../public/icons/NewIcon";

const Title = () => {
  return (
    <div className="w-full flex justify-between">
      <div className="flex gap-x-2">
        <NewIcon />
        <div className="text-lg font-bold">Truyện mới ra lò</div>
      </div>
    </div>
  );
};

export default Title;
