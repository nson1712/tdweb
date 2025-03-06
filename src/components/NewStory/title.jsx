import NewIcon from "../../../public/icons/NewIcon";

const Title = () => {
  return (
    <div className="w-full flex justify-between">
      <div className="flex gap-x-2">
        <NewIcon />
        <h2 className="text-lg font-bold">Truyện Mới 💥</h2>
      </div>
    </div>
  );
};

export default Title;
