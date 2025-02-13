import Image from "next/image";
import imageLoader from "../../loader/imageLoader";

const Logo = () => {
  return (
    <div className="logo cursor-pointer hover:translate-y-[-5%] transition delay-75 self-center">
      <Image
        loader={imageLoader}
        src="https://toidoc.vn/images/logo-toidoc.svg"
        alt="Toidoc"
        title="Toidoc"
        width={56}
        height={56}
      />
    </div>
  );
};

export default Logo;
