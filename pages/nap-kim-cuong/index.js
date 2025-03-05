import React from 'react'
import PaymentComponent from '../../src/pages/Payment'
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
import HeaderServer from '../../src/components/HeaderServer'

const Payment = (data) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LemlQIqAAAAAN3GiXSgwfSljLMiGgRAINr1ALev">
      <>
      <HeaderServer 
        title={'Toidoc - Nạp kim cương tự động'} 
      />
      <PaymentComponent referralCode={data?.referralCode} storySlug={data?.storySlug} chapterSlug={data?.chapterSlug}/>
      </>
    </GoogleReCaptchaProvider>
  )
}

Payment.getInitialProps = async (ctx) => {
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
        referralCode: '',
        storySlug: '',
        chapterSlug: '',
      };
    } catch (e) {
     return {
        referralCode: '',
        storySlug: '',
        chapterSlug: '',
      };
    }
  };

  return await getDetail();
};

export default Payment
