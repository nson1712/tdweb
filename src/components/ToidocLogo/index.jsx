import Image from "next/image";

const Logo = () => {
  return (
    <div className="logo cursor-pointer hover:translate-y-[-5%] transition delay-75">
      <Image
        src="https://toidoc.vn/images/logo-toidoc.svg"
        alt="loo"
        width={56}
        height={56}
      />
    </div>
  );
};

export default Logo;