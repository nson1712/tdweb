import Image from "next/image";
import imageLoader from "../../loader/imageLoader";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="cursor-pointer self-center w-72">
      <Link href="/tim-kiem" passHref>
        <a>
          <Image
            loader={imageLoader}
            src="https://toidoc.vn/images/logo-toidoc.svg"
            alt="Toidoc nền tảng đọc truyện full online"
            title="Toidoc nền tảng đọc truyện full online"
            width={100}
            height={100}
          />
        </a>
      </Link>
    </div>
  );
};

export default Logo;
