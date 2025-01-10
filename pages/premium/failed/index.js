import React from "react";
import HeaderServer from "../../../src/components/HeaderServer";
import PremiumPaymentFail from "../../../src/pages/Payment/PremiumPaymentFail";

const PremiumPaymentFailComponent = () => {
  return (
    <>
      <HeaderServer title={"Toidoc - Mua Premium tự động thất bại"} />
      <PremiumPaymentFail />
    </>
  );
};

export default PremiumPaymentFailComponent;
