import React from 'react'
import PaymentSuccess from '../../../src/pages/Payment/PaymentSuccess'
import HeaderServer from '../../../src/components/HeaderServer'

const PaymentSuccessComponent = ({detail}) => {
  return (
    <>
      <HeaderServer 
        title={'Toidoc - Nạp kim cương tự động thành công'} 
      />
      <PaymentSuccess/>
    </>
    
  )
}

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
  //     const result = await axios.post(`http://fsdfssf.truyenso1.xyz/customer/public/customer/deposit/qr/result`, data);

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

export default PaymentSuccessComponent
