import Image from "next/image";
import imageLoader from "../../src/loader/imageLoader";
import RedDiamondIcon from "../pages/Payment/RedDiamondIcon";
import crownIcon from "../../public/images/queen-crown.png";

export const useDiamondPackages = () => {
  const diamondPackage = [
    {
      value: "18000",
      label: (
        <div className="flex gap-x-2 justify-center text-lg">
          Nạp 15,000 <RedDiamondIcon />
        </div>
      ),
      qr: "/images/18k.jpg",
    },
    {
      value: "50000",
      label: (
        <div className="flex gap-x-2 justify-center text-lg">
          Nạp 50,000 <RedDiamondIcon className="self-center" />
        </div>
      ),
      qr: "/images/50k.jpg",
    },
    {
      value: "100000",
      label: (
        <div className="flex gap-x-2 justify-center text-lg">
          Nạp 105,000 <RedDiamondIcon className="self-center" />
        </div>
      ),
      qr: "/images/100k.jpg",
    },
    {
      value: "200000",
      label: (
        <div className="flex gap-x-2 justify-center text-lg">
          Nạp 210,000 <RedDiamondIcon className="self-center" />
        </div>
      ),
      qr: "/images/200k.jpg",
    },
    {
      value: "300000",
      label: (
        <div className="flex gap-x-2 justify-center text-lg">
          Nạp 315,000 <RedDiamondIcon className="self-center" />
        </div>
      ),
      qr: "/images/300k.jpg",
    },
    {
      value: "500000",
      label: (
        <div className="flex gap-x-2 justify-center text-lg">
          Nạp 530,000 <RedDiamondIcon className="self-center" />
        </div>
      ),
      qr: "/images/500k.jpg",
    },
    {
      value: "1000000",
      label: (
        <div className="flex gap-x-2 justify-center text-lg">
          Nạp 1,060,000 <RedDiamondIcon className="self-center" />
        </div>
      ),
      qr: "/images/1tr.jpg",
    },
  ];

  return {
    diamondPackage,
  };
};

export const useMobileCardPackages = () => {
  const cardAmount = [
    { value: "20000", label: "20,000VND" },
    { value: "50000", label: "50,000VND" },
    { value: "100000", label: "100,000VND" },
    { value: "200000", label: "200,000VND" },
  ];

  const networkProvider = [
    { value: "vinaphone", label: "Vinaphone" },
    { value: "viettel", label: "Viettel" },
  ];

  return {
    cardAmount,
    networkProvider,
  };
};

export const usePaypalPackages = () => {
  const paypalDiamondPackages = [
    {
      label: (
        <div className="flex gap-x-2 text-base">
          105,000 <RedDiamondIcon className="self-center" /> - 7$
        </div>
      ),
      value: 7,
    },
    {
      label: (
        <div className="flex gap-x-2 text-base">
          210,000 <RedDiamondIcon className="self-center" /> - 11$
        </div>
      ),
      value: 11,
    },
    {
      label: (
        <div className="flex gap-x-2 text-base">
          315,000 <RedDiamondIcon className="self-center" /> - 15$
        </div>
      ),
      value: 15,
    },
    {
      label: (
        <div className="flex gap-x-2 text-base">
          530,000 <RedDiamondIcon className="self-center" /> - 23$
        </div>
      ),
      value: 23,
    },
    {
      label: (
        <div className="flex gap-x-2 text-base">
          1,080,000 <RedDiamondIcon className="self-center" /> - 43$
        </div>
      ),
      value: 43,
    },
  ];

  const paypalPremiumPackages = [
    {
      label: (
        <div className="flex gap-x-2 text-base">
          <div className="self-center">
            <Image
              loader={imageLoader}
              width={22}
              height={22}
              src={crownIcon}
            />
          </div>{" "}
          3 Tháng - 26$
        </div>
      ),
      value: 26,
    },
    {
      label: (
        <div className="flex gap-x-2 text-base">
          <div className="self-center">
            <Image
              loader={imageLoader}
              width={22}
              height={22}
              src={crownIcon}
            />
          </div>{" "}
          6 Tháng - 46$
        </div>
      ),
      value: 46,
    },
    {
      label: (
        <div className="flex gap-x-2 text-base">
          <div className="self-center">
            <Image
              loader={imageLoader}
              width={22}
              height={22}
              src={crownIcon}
            />
          </div>{" "}
          1 Năm - 79$
        </div>
      ),
      value: 79,
    },

  ];

  return {
    paypalDiamondPackages,
    paypalPremiumPackages
  };
};
