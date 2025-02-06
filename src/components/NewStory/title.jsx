import { ReloadOutlined } from "@ant-design/icons";
import NewIcon from "../../../public/icons/NewIcon";

const Title = ({ handleRefreshData }) => {
  return (
    <div className="w-full flex justify-between">
      <div className="flex">
        <NewIcon />
        <div className="text-lg font-bold">Truyện mới ra lò</div>
      </div>
      <div
        className="text-blue-500 text-base font-medium self-center hover:text-blue-600 cursor-pointer"
        onClick={handleRefreshData}
      >
        <ReloadOutlined /> Làm Mới
      </div>
    </div>
  );
};

export default Title;
