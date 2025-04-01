import React from 'react'
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
import HeaderServer from '../../src/components/HeaderServer'
import PaymentMethods from '../../src/pages/Payment/PaymentMethods'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

const PaymentMethodPage = () => {
  return (
    // <GoogleReCaptchaProvider reCaptchaKey="6LemlQIqAAAAAN3GiXSgwfSljLMiGgRAINr1ALev">
      // <PayPalScriptProvider options={{
      //   clientId:
      //     "Ad_kfIztCssh1X3HrKoDMxBQiCI0B6quYjgppzA5U4YIuZQ17Fur5M2UR6-QiwSnwJqKnXzxfDDlZDqO",
      //   currency: "USD",
      //   intent: "capture",
      //   components: "card-fields,buttons",
      // }}>
      <>
      <HeaderServer
        title={'Toidoc - Phương thức nạp'} 
      />
      <PaymentMethods />
      </>
      // {/* </PayPalScriptProvider> */}
    // {/* </GoogleReCaptchaProvider> */}
  )
}

export default PaymentMethodPage
