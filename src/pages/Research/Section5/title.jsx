import { ReloadOutlined } from "@ant-design/icons";

const Title = ({ handleRefreshData }) => {
  return (
    <div className="flex gap-2">
      <div className="text-lg sm:text-xl font-bold">Top xem nhiều</div>
      <div
        className="text-sm self-center text-blue-500 hover:text-blue-600 focus:text-blue-600 cursor-pointer"
        onClick={handleRefreshData}
      >
        <ReloadOutlined /> Làm mới
      </div>
    </div>
  );
};

export default Title;
