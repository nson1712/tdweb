import { useRouter } from "next/router";

const ButtonViewAll = ({ className, url }) => {
  const router = useRouter();
  const handleViewAll = () => {
    router.push(`${url}`);
  };
  return (
    <button className={className} type="button" onClick={handleViewAll}>
      Xem thêm
    </button>
  );
};

export default ButtonViewAll;
