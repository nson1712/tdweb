import React from "react";
import Button from "../../components/Button/Button";
import HeaderPayment from "./HeaderPayment";
import Router from "next/router";

const PremiumPaymentFail = () => {
  return (
    <div className="relative max-w-[768px] mx-auto bg-white md:pt-[88px] flex flex-col justify-center text-second-color">
      <HeaderPayment />
      <div className="w-full mx-auto" style={{ marginTop: "50px" }}>
        <p className="text-[20px] font-bold main-text text-center">
          Giao dịch không thành công!
        </p>
        <img src={"/images/sad.png"} className="w-[85px] mx-auto" />
      </div>
      <ul className="max-w-[420px] mx-auto mt-[20px]">
        <li>Xin vui lòng liên hệ Toidoc để được hỗ trợ nhé</li>
      </ul>
      <Button
        className="btnMain btnSecond max-w-[300px] mx-auto mt-[20px]"
        onClick={(e) => {
          Router.push("/premium");
        }}
      >
        Gói Premium khác
      </Button>
      <Button
        className="btnSecond-Second max-w-[300px] mx-auto"
        onClick={() => {
          window.open(
            "https://m.me/185169981351799?text=Mình đăng ký premium qua web không được. Hỗ trợ giúp mình với."
          );
        }}
      >
        Liên hệ Toidoc
      </Button>
    </div>
  );
};

export default PremiumPaymentFail;
