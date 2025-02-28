import Link from "next/link";

const ButtonViewAll = ({ className, url, title }) => {
  return (
    <Link href={`${url}`}>
      <a title={title} className={className}>
        Xem thêm
      </a>
    </Link>
  );
};

export default ButtonViewAll;
