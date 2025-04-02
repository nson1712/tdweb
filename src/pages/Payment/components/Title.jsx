import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const Title = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center gap-x-4 text-xl sm:text-3xl text-center font-bold pt-3 pb-3 sm:pb-0 bg-gradient-to-br from-[#ADF7F2] to-[#15AAFF] sm:bg-none">
      <ArrowLeftOutlined
        onClick={() => router.back()}
        className="text-lg sm:text-3xl"
      />
      <div>Các phương thức nạp của Toidoc</div>
    </div>
  );
};

export default Title;
