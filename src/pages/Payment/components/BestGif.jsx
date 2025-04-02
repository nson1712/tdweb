import { Image } from "antd";

const BestGif = () => {
  return (
    <div className="absolute -top-5 right-5 z-999">
      <Image preview={false} width={60} height={40} src="images/best.gif" />
    </div>
  );
};

export default BestGif;
