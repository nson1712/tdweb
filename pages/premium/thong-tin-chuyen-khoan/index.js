import React from "react";
import HeaderServer from "../../../src/components/HeaderServer";
import PremiumTransferInfo from "../../../src/pages/Payment/PremiumTransferInfo";

const PremiumTransferInfoComponent = () => {
  return (
    <>
      <HeaderServer title={"Toidoc - Mua Premium tự động thành công"} />
      <PremiumTransferInfo />
    </>
  );
};

export default PremiumTransferInfoComponent;
