import { useRouter } from "next/router";
import ExchangeIcon from "../../../../public/icons/ExchangeIcon";
import BestGif from "./BestGif";
import Link from "next/link";

const AutoDeposit = ({ referralCode, storySlug, chapterSlug }) => {

  return (
    <Link
      href={{
        pathname: "/nap-kim-cuong",
        query: {
          ...(referralCode ? { ref: referralCode } : {}),
          ...(storySlug ? { story: storySlug } : {}),
          ...(chapterSlug ? { chapter: chapterSlug } : {}),
        },
      }}
    >
      <a className="relative bg-white border-1 border-slate-200 rounded-lg flex px-3 py-2.5 gap-x-4 hover:!bg-slate-50 transition duration-300 cursor-pointer z-10">
        <BestGif />
        <ExchangeIcon />
        <div>
          <div className="text-[#f40233] text-base font-semibold">
            Nạp tự động
          </div>
          <div className="text-[#5124ec] text-xs sm:text-sm line-clamp-1">
            Nhanh, tiện, không cần chờ admin duyệt..
          </div>
        </div>
      </a>
    </Link>
  );
};

export default AutoDeposit;
