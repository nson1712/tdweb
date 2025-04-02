import { useRouter } from "next/router";
import ExchangeIcon from "../../../../public/icons/ExchangeIcon";
import BestGif from "./BestGif";
import Link from "next/link";

const AutoDeposit = ({referralCode, storySlug, chapterSlug}) => {
  const router = useRouter();

  return (
    <Link href={{
      pathname: "/nap-kim-cuong",
      query: {
        ref: referralCode,
        story: storySlug,
        chapter: chapterSlug,
      }
    }}>
    <a
      className="relative bg-white border-1 border-slate-200 rounded-lg flex px-3 py-2.5 gap-x-4 hover:!bg-slate-50 transition duration-300 cursor-pointer z-10"
    >
      <BestGif />
      <ExchangeIcon />
      <div>
        <div className="text-base font-semibold">Nạp kim cương tự động</div>
        <div className="text-slate-500 text-xs sm:text-sm line-clamp-1">
          Nhanh, tiện, không cần chờ admin duyệt..
        </div>
      </div>
    </a>
    </Link>
  );
};

export default AutoDeposit;
