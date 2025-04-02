import {
  notification,
} from "antd";
import AutoDeposit from "./components/AutoDeposit";
import DefaultDeposit from "./components/DefaultDeposit";
import MobileCardDeposit from "./components/MobileCardDeposit";
import PaypalDeposit from "./components/PaypalDeposit";
import CommonLayout from "../../layouts/CommonLayout/CommonLayout";
import Header from "../../components/Header/Header";
import Title from "antd/es/typography/Title";

const PaymentMethods = ({ referralCode }) => {
  const [api, contextHolder] = notification.useNotification();
  return (
    <CommonLayout>
      {contextHolder}
      <Header />
      <div className="h-screen max-w-[768px] mx-auto sm:pt-24 overflow-y-auto bg-white">
        <Title className="self-center" level={2}>Các phương thức nạp của ToiDoc</Title>
        <div className="mx-auto max-w-[600px] space-y-4 mt-10 px-2">
          <AutoDeposit />
          <DefaultDeposit />
          <MobileCardDeposit referralCode={referralCode} />
          <PaypalDeposit api={api} />
        </div>
      </div>
    </CommonLayout>
  );
};

export default PaymentMethods;
