import React from 'react'
import TransferInfo from '../../../src/pages/Payment/TransferInfo'
import axios from 'axios'
import HeaderServer from '../../../src/components/HeaderServer'

const TransferInfoComponent = () => {
  return (
    <>
      <HeaderServer 
        title={'Toidoc - Nạp kim cương tự động thành công'} 
      />
      <TransferInfo/>
    </>
    
  )
}

export default TransferInfoComponent
