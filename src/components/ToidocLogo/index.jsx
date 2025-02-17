import Image from "next/image";
import imageLoader from "../../loader/imageLoader";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="cursor-pointer self-center w-[56px] h-[56px]">
      <Link href="/tim-kiem" passHref>
        <a>
          <Image
            loader={imageLoader}
            src="https://toidoc.vn/images/logo-toidoc.svg"
            alt="Toidoc nền tảng đọc truyện full online"
            title="Toidoc nền tảng đọc truyện full online"
            width={56}
            height={56}
          />
        </a>
      </Link>
    </div>
  );
};

export default Logo;
