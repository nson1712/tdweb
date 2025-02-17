import Link from "next/link";

const ButtonViewAll = ({ className, url }) => {
  return (
    <Link href={`${url}`}>
      <a title={url} className={className}>
        Xem thêm
      </a>
    </Link>
  );
};

export default ButtonViewAll;
