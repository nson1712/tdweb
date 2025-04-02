import React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import HeaderServer from "../../src/components/HeaderServer";
import PaymentMethods from "../../src/pages/Payment/PaymentMethods";

const PaymentMethodPage = (data) => {
  console.log("DATA: ", data)
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LemlQIqAAAAAN3GiXSgwfSljLMiGgRAINr1ALev">
      <>
        <HeaderServer title={"Toidoc - Phương thức nạp"} />
        <PaymentMethods
          referralCode={data?.referralCode}
          storySlug={data?.storySlug}
          chapterSlug={data?.chapterSlug}
        />
      </>
    </GoogleReCaptchaProvider>
  );
};

PaymentMethodPage.getInitialProps = async (ctx) => {
  console.log("CTXXXXXXXX: ", ctx)
  const getDetail = async () => {
    try {
      if (ctx.query.ref) {
        return {
          referralCode: ctx.query.ref,
          storySlug: ctx.query.story,
          chapterSlug: ctx.query.chapter,
        };
      }

      return {
        referralCode: "",
        storySlug: "",
        chapterSlug: "",
      };
    } catch (e) {
      return {
        referralCode: "",
        storySlug: "",
        chapterSlug: "",
      };
    }
  };

  return await getDetail();
};

export default PaymentMethodPage;
