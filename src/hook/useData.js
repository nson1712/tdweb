import RedDiamondIcon from "../pages/Payment/RedDiamondIcon";
import qr18k from "../../public/images/18k.jpg";
import qr50k from "../../public/images/50k.jpg";
import qr100k from "../../public/images/100k.jpg";
import qr200k from "../../public/images/200k.jpg";
import qr300k from "../../public/images/300k.jpg";
import qr500k from "../../public/images/500k.jpg";
import qr1000k from "../../public/images/1tr.jpg";

export const useDiamondPackages = () => {
  const diamondPackage = [
    {
      value: "18000",
      label: (
        <div className="flex gap-x-2 justify-center text-lg">
          Nạp 15,000 <RedDiamondIcon />
        </div>
      ),
      qr: qr18k,
    },
    {
      value: "50000",
      label: (
        <div className="flex gap-x-2 justify-center text-lg">
          Nạp 50,000 <RedDiamondIcon className="self-center" />
        </div>
      ),
      qr: qr50k,
    },
    {
      value: "100000",
      label: (
        <div className="flex gap-x-2 justify-center text-lg">
          Nạp 105,000 <RedDiamondIcon className="self-center" />
        </div>
      ),
      qr: qr100k,
    },
    {
      value: "200000",
      label: (
        <div className="flex gap-x-2 justify-center text-lg">
          Nạp 210,000 <RedDiamondIcon className="self-center" />
        </div>
      ),
      qr: qr200k,
    },
    {
      value: "300000",
      label: (
        <div className="flex gap-x-2 justify-center text-lg">
          Nạp 315,000 <RedDiamondIcon className="self-center" />
        </div>
      ),
      qr: qr300k,
    },
    {
      value: "500000",
      label: (
        <div className="flex gap-x-2 justify-center text-lg">
          Nạp 530,000 <RedDiamondIcon className="self-center" />
        </div>
      ),
      qr: qr500k,
    },
    {
      value: "1000000",
      label: (
        <div className="flex gap-x-2 justify-center text-lg">
          Nạp 1,060,000 <RedDiamondIcon className="self-center" />
        </div>
      ),
      qr: qr1000k,
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
  const paypalPackages = [
    {
      label: (
        <div className="flex gap-x-2 text-base">
          136,500 <RedDiamondIcon className="self-center" /> - 7$
        </div>
      ),
      value: 7,
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
          1,060,000 <RedDiamondIcon className="self-center" /> - 43$
        </div>
      ),
      value: 43,
    },
  ];

  return {
    paypalPackages,
  };
};
