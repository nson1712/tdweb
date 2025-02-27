import React from "react";
import HeaderServer from "../../../src/components/HeaderServer";
import PremiumPaymentSuccess from "../../../src/pages/Payment/PremiumPaymentSuccess";

const PremiumPaymentSuccessComponent = () => {
  return (
    <>
      <HeaderServer title={"Toidoc - Đăng ký Premium tự động thành công"} />
      <PremiumPaymentSuccess />
    </>
  );
};

export default PremiumPaymentSuccessComponent;
