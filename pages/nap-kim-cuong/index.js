import React from 'react'
import PaymentComponent from '../../src/pages/Payment'
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
import HeaderServer from '../../src/components/HeaderServer'

const Payment = (referralCode) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LemlQIqAAAAAN3GiXSgwfSljLMiGgRAINr1ALev">
      <>
      <HeaderServer 
        title={'Toidoc - Nạp kim cương tự động'} 
      />
      <PaymentComponent referralCode={referralCode?.referralCode}/>
      </>
    </GoogleReCaptchaProvider>
  )
}

Payment.getInitialProps = async (ctx) => {
  const getDetail = async () => {
    try {
      if (ctx.query.ref) {
        console.log('ctx.query.ref: ', ctx.query.ref);
        return {
          referralCode: ctx.query.ref,
        };
      }

      return {
        referralCode: '',
      };
    } catch (e) {
     return {
        referralCode: '',
      };
    }
  };

  return await getDetail();
};

export default Payment
