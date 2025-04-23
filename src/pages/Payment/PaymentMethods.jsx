import { useEffect } from "react";
import { notification } from "antd";
import MobileCardDeposit from "./components/MobileCardDeposit";
import DefaultDeposit from "./components/DefaultDeposit";
import ForeignDeposit from "./components/ForeignDeposit";
import PaypalDeposit from "./components/PaypalDeposit";
import Header from "../../components/Header/Header";
import MomoDeposit from "./components/MomoDeposit";
import AutoDeposit from "./components/AutoDeposit";
import Title from "./components/Title";
import CommonLayout from "../../layouts/CommonLayout/CommonLayout";
import GlobalStore from "../../stores/GlobalStore";

const PaymentMethods = ({ referralCode, storySlug, chapterSlug }) => {
  const [api, contextHolder] = notification.useNotification();
  const { checkIsLogin } = GlobalStore;

  useEffect(() => {
    checkIsLogin();
  }, []);

  return (
    <>
      {contextHolder}
      <div className="h-lvh max-w-[768px] mx-auto sm:pt-24 pb-10 overflow-y-auto bg-white">
        <Title />

        <div className="mx-auto max-w-[600px] space-y-4 mt-10 px-2">
          <AutoDeposit
            referralCode={referralCode}
            storySlug={storySlug}
            chapterSlug={chapterSlug}
          />
          <DefaultDeposit />
          <MobileCardDeposit referralCode={referralCode} />
          <PaypalDeposit api={api} />
          <MomoDeposit />
          <ForeignDeposit />
        </div>
      </div>
    </>
  );
};

export default PaymentMethods;
