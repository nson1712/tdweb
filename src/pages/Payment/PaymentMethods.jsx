import { notification } from "antd";
import AutoDeposit from "./components/AutoDeposit";
import DefaultDeposit from "./components/DefaultDeposit";
import MobileCardDeposit from "./components/MobileCardDeposit";
import PaypalDeposit from "./components/PaypalDeposit";
import CommonLayout from "../../layouts/CommonLayout/CommonLayout";
import Header from "../../components/Header/Header";
import MomoDeposit from "./components/MomoDeposit";
import ForeignDeposit from "./components/ForeignDeposit";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const PaymentMethods = ({ referralCode }) => {
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  return (
    <CommonLayout>
      {contextHolder}
      <Header />
      <div className="h-lvh max-w-[768px] mx-auto sm:pt-24 pb-10 overflow-y-auto bg-white">
        <div className="relative">
          <ArrowLeftOutlined
            onClick={() => router.back()}
            className="absolute left-5 top-5 text-lg sm:text-3xl"
          />
          <div className="text-xl sm:text-3xl text-center font-bold pt-3 pb-3 sm:pb-0 bg-gradient-to-br from-[#ADF7F2] to-[#15AAFF] sm:bg-none">
            {" "}
            Các phương thức nạp của Toidoc
          </div>
        </div>
        <div className="mx-auto max-w-[600px] space-y-4 mt-10 px-2">
          <AutoDeposit />
          <DefaultDeposit />
          <MobileCardDeposit referralCode={referralCode} />
          <PaypalDeposit api={api} />
          <MomoDeposit />
          <ForeignDeposit />
        </div>
      </div>
    </CommonLayout>
  );
};

export default PaymentMethods;
