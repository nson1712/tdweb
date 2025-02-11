import { ReloadOutlined } from "@ant-design/icons";
import CommunityIcon from "../../../../public/icons/CommunityIcon";

const Title = ({ handleRefreshData }) => {
  return (
    <div className="flex gap-x-2">
      <CommunityIcon className="self-center" />
      <div className="text-lg sm:text-xl font-bold">Top mới nổi</div>
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
