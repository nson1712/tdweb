import Link from "next/link";

const ButtonViewAll = ({ className, url }) => {
  return (
    <Link href={`${url}`}>
    <div title={url} className={className}>
      Xem thêm
    </div>
    </Link>
  );
};

export default ButtonViewAll;
