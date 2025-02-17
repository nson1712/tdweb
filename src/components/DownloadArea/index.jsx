import AppStoreIcon from "../../../public/icons/AppStoreIcon";
import GooglePlayStoreIcon from "../../../public/icons/GooglePlayStoreIcon";
import { getOS, handleStoreOpen } from "../../utils/utils";

const DownloadArea = () => {
  return (
    <div className="hidden md:flex flex-col md:flex-row gap-x-2 cursor-pointer ml-3">
      <div className="space-y-1">
        <p className="text-gray-500 text-sm leading-normal font-medium">
          Tải app và khám phá đầy đủ tính năng
        </p>
        <button
          type="button"
          className="w-full text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-bold rounded-lg text-base p-2.5 text-center shadow-md"
          onClick={() => handleStoreOpen(getOS())}
        >
          Tải App Ngay
        </button>
      </div>
      <div>
        <div className="flex -mt-5 hover:translate-x-[5%] transition delay-75">
          <GooglePlayStoreIcon onClick={() => handleStoreOpen("android")} />
        </div>
        <div className="flex -mt-12 hover:translate-x-[5%] transition delay-75">
          <AppStoreIcon onClick={() => handleStoreOpen("ios")} />
        </div>
      </div>
    </div>
  );
};

export default DownloadArea;
