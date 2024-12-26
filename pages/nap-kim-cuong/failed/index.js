import React from 'react'
import PaymentFail from '../../../src/pages/Payment/PaymentFail'
import HeaderServer from '../../../src/components/HeaderServer'

const PaymentFailComponent = () => {
  return (
    <>
      <HeaderServer 
        title={'Toidoc - Nạp kim cương tự động thất bại'} 
      />
      <PaymentFail />
    </>
  )
}

export default PaymentFailComponent
