import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import CommonLayout from '../../layouts/CommonLayout/CommonLayout'
import Button from '../../components/Button/Button'
import FooterDesktop from '../../components/FooterDesktop'
import ChatSupport from '../../components/Button/ChatSupport'
import HeaderPayment from './HeaderPayment'
import Router from 'next/router'

const PaymentSuccess = ({
}) => {
  const [showChat, setShowChat] = useState(true);
  return (
    <CommonLayout >
      <div>
        <Header/>
        <div className='relative max-w-[768px] mx-auto bg-white mt-[16px] md:pt-[88px] flex flex-col justify-center text-second-color'>
          <HeaderPayment />
          <img src={"https://js.pngtree.com/a4/static/l03b0s.d57ca31e.gif"} />
          <div className='w-full mx-auto' style={{'position': 'absolute', 'marginTop': '50px'}}>
            <p className='text-[20px] font-bold main-text text-center'>
              Bạn đã nạp kim cương thành công!
            </p>
            <img
              src={"/images/check.png"}
              className="w-[85px] mx-auto"
            />
          </div>
          {/*detail?.code === '200' ?
            <>
              <img src={"https://js.pngtree.com/a4/static/l03b0s.d57ca31e.gif"} />
              <div className='w-full mx-auto' style={{'position': 'absolute', 'marginTop': '50px'}}>
                <p className='text-[20px] font-bold main-text text-center'>
                  Bạn đã được nạp kim cương thành công!
                </p>
                <p className='text-[20px] font-bold main-text text-center'>
                  {detail?.amount}
                </p>
                <img
                  src={"/images/check.png"}
                  className="w-[85px] mx-auto"
                />
              </div>
            </>
            :
            <>
              <div className='w-full mx-auto' style={{'marginTop': '50px'}}>
                <p className='text-[20px] font-bold main-text text-center'>
                  {detail?.message}
                </p>
                <img
                  src={"/images/sad.png"}
                  className="w-[85px] mx-auto"
                />
              </div>
            </>
          */}
          <ul className='max-w-[420px] mx-auto mt-[20px]'>
            <li>Xin vui lòng mở App Toidoc để kiểm tra nhé</li>
            <li>Nếu bạn cần hỗ trợ thêm, xin vui lòng Click vào chú chim "Chat Ngay"</li>
          </ul>
          <Button className='btnMain btnSecond max-w-[300px] mx-auto'
            onClick={(e) => {
              Router.push('/nap-kim-cuong')
            }}
          >
            Nạp thêm kim cương
          </Button>
          {/*detail?.code === '200' ?
            <Button className='btnSecond-Second max-w-[300px] mx-auto'
              onClick={(e) => {
                window.open('https://toidoc.onelink.me/59bO/d42503wz')
              }}
            >
              Mở App Toidoc
            </Button>
            :
            <Button className='btnSecond-Second max-w-[300px] mx-auto'
              onClick={(e) => {
                window.open('https://m.me/185169981351799?text=Mình nạp qua web không được. Hỗ trợ giúp mình với.')
              }}
            >
              Liên hệ Toidoc
            </Button>
            */}
          <FooterDesktop />
        </div>
      </div>
      <ChatSupport showChat={showChat} setShowChat={setShowChat} />
    </CommonLayout>
  )
}

export default PaymentSuccess
