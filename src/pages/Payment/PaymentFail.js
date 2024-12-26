import React from 'react'
import Header from '../../components/Header/Header'
import CommonLayout from '../../layouts/CommonLayout/CommonLayout'
import Button from '../../components/Button/Button'
import FooterDesktop from '../../components/FooterDesktop'
import HeaderPayment from './HeaderPayment'
import Router from 'next/router'

const PaymentFail = () => {

  return (
    <CommonLayout >
      <div>
        <Header/>
        <div className='relative max-w-[768px] mx-auto bg-white mt-[16px] md:pt-[88px] flex flex-col justify-center text-second-color'>
          <HeaderPayment />
          <div className='w-full mx-auto' style={{'marginTop': '50px'}}>
            <p className='text-[20px] font-bold main-text text-center'>
              Giao dịch không thành công!
            </p>
            <img
              src={"/images/sad.png"}
              className="w-[85px] mx-auto"
            />
          </div>
          <ul className='max-w-[420px] mx-auto mt-[20px]'>
            <li>Xin vui lòng liên hệ Toidoc để được hỗ trợ nhé</li>
          </ul>
          <Button className='btnMain btnSecond max-w-[300px] mx-auto mt-[20px]'
            onClick={(e) => {
              Router.push('/nap-kim-cuong')
            }}
          >
            Nạp gói kim cương khác
          </Button>
          <Button className='btnSecond-Second max-w-[300px] mx-auto'
            onClick={(e) => {
              window.open('https://m.me/185169981351799?text=Mình qua web không được. Hỗ trợ giúp mình với.')
            }}
          >
            Liên hệ Toidoc
          </Button>
          <FooterDesktop />
        </div>
      </div>
    </CommonLayout>
  )
}

export default PaymentFail
