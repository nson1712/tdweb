import React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import HeaderServer from "../../src/components/HeaderServer";
import PremiumPayment from "../../src/pages/Payment/PremiumPayment";

const Payment = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LemlQIqAAAAAN3GiXSgwfSljLMiGgRAINr1ALev">
      <>
        <HeaderServer title={"Toidoc - Đăng ký Premium tự động"} />
        <PremiumPayment />
      </>
    </GoogleReCaptchaProvider>
  );
};

export default Payment;
