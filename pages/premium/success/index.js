import React from "react";
import HeaderServer from "../../../src/components/HeaderServer";
import PremiumPaymentSuccess from "../../../src/pages/Payment/PremiumPaymentSuccess";

const PremiumPaymentSuccessComponent = () => {
  return (
    <>
      <HeaderServer title={"Toidoc - Mua Premium tự động thành công"} />
      <PremiumPaymentSuccess />
    </>
  );
};

// PaymentSuccessComponent.getInitialProps = async (ctx) => {
// const updateResult = async () => {
//   try {

//     const data = {
//       orderCode: ctx.query.orderCode,
//       status: ctx.query.status,
//       code: ctx.query.code,
//       paymentLinkId: ctx.query.id
//     }
//     console.log('Data: ', data);
//     const result = await axios.post(`http://api.toidoc.vn/customer/public/customer/deposit/qr/result`, data);

//     return {
//       detail: result?.data
//     }
//   } catch(e) {
//     console.log('e ===> ', e);
//     console.log('e.data ====> ', e.response.data);
//     return {
//       detail: {status: 'fail'},
//     }
//   }
// }

// return await updateResult()

// }

export default PremiumPaymentSuccessComponent;
