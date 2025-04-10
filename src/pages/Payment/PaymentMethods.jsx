import { notification } from "antd";
import AutoDeposit from "./components/AutoDeposit";
import DefaultDeposit from "./components/DefaultDeposit";
import MobileCardDeposit from "./components/MobileCardDeposit";
import PaypalDeposit from "./components/PaypalDeposit";
import CommonLayout from "../../layouts/CommonLayout/CommonLayout";
import Header from "../../components/Header/Header";
import MomoDeposit from "./components/MomoDeposit";
import ForeignDeposit from "./components/ForeignDeposit";
import GlobalStore from "../../stores/GlobalStore";
import { useEffect } from "react";
import Title from "./components/Title";

const PaymentMethods = ({ referralCode, storySlug, chapterSlug }) => {
  const [api, contextHolder] = notification.useNotification();
  const { checkIsLogin } = GlobalStore;

  useEffect(() => {
    checkIsLogin();
  }, []);

  return (
    <CommonLayout>
      {contextHolder}
      <Header />
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
    </CommonLayout>
  );
};

export default PaymentMethods;
