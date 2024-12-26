import React from 'react'
import Header from '../../components/Header/Header'
import CommonLayout from '../../layouts/CommonLayout/CommonLayout'
import { observer } from 'mobx-react'


const Maintainance = () => {

  return (
    <CommonLayout >
      <div>
        <Header selectedTab={'HOME'}/>
        <div className='relative pb-[100px] max-w-[768px] mx-auto bg-white mt-[16px] md:pt-[88px] px-0 md:px-[8px]'>
          <h1>TOIDOC Thông báo nâng cấp hệ thống</h1>
          <p>Nhằm mang lại trải nghiệm đọc truyện tốt hơn cho mọi Quý Khách, chúng tôi không ngừng cải tiến và nâng cấp hệ thống.</p>
          <p>- Thời gian nâng cấp hệ thống: <strong>17:00 03/01/2024 - 12:30 ngày 04/01/2024</strong></p>
          <p>Trong thời gian này hệ thống có thể bị gián đoạn đến trải nghiệm của Quý Khách.</p>
          <p>Chúng tôi thành thật xin lỗi và cảm ơn Quý Khách đã tin tưởng và sử dụng App!</p>
          <p>Trân Trọng !</p>
          <p>Ban quản trị Toidoc,</p>
        </div>
      </div>
    </CommonLayout>
  )
}

export default observer(Maintainance)
