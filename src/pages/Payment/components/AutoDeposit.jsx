import { useRouter } from "next/router";
import ExchangeIcon from "../../../../public/icons/ExchangeIcon";
import BestGif from "./BestGif";

const AutoDeposit = () => {
  const router = useRouter();
  return (
    <div
      className="relative bg-white border-1 border-slate-200 rounded-lg flex px-3 py-2.5 gap-x-4 hover:!bg-slate-50 transition duration-300 cursor-pointer z-10"
      onClick={() => router.push("/nap-kim-cuong")}
    >
      <BestGif />
      <ExchangeIcon />
      <div>
        <div className="text-base font-semibold">Nạp kim cương tự động</div>
        <div className="text-slate-500 text-xs sm:text-sm line-clamp-1">
          Nhanh, tiện, không cần chờ admin duyệt..
        </div>
      </div>
    </div>
  );
};

export default AutoDeposit;
