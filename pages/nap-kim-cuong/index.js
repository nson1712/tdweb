import React from 'react'
import PaymentComponent from '../../src/pages/Payment'
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
import HeaderServer from '../../src/components/HeaderServer'

const Payment = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LemlQIqAAAAAN3GiXSgwfSljLMiGgRAINr1ALev">
      <HeaderServer 
        title={'Toidoc - Nạp kim cương tự động'} 
      />
      <PaymentComponent />
    </GoogleReCaptchaProvider>
  )
}

export default Payment
