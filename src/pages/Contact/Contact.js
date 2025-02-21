import React from 'react'
import Header from '../../components/Header/Header'
import CommonLayout from '../../layouts/CommonLayout/CommonLayout'
import { observer } from 'mobx-react'
import StoryStore from '../../stores/StoryStore'

const Contact = () => {

  const {
    saveCustomerClickBanner,
  } = StoryStore
  
  const handleClick = (e, code) => {
    // saveCustomerClickBanner(code)
    window.open('https://toidoc.onelink.me/59bO/d42503wz', '_blank', 'Toidoc')
  }
  return (
    <CommonLayout >
      <div>
        <Header selectedTab={'CONTACT'}/>
        <div className='home-content pt-[16px] md:pt-0'>
          <div className='flex items-center justify-between px-[20px] mb-[16px]'>
            <p className='mb-0 text-[14px] font-semibold label-text'>
              Xin chào, <b className='main-text text-[15px]'>bạn</b>
            </p>

            <div className='flex items-center'>
              <a className='w-[100px] h-[32px] flex items-center justify-center rounded-full download-btn text-white pr-[10px] mr-[10px]'
                  onClick={(e) => handleClick(e, 'button-contact-page')} >
                <img src='/images/download-arrow.png' className='w-[24px]' alt='Góp ý truyện fulll' title='Góp ý truyện full'/>
                Tải app
              </a>
              <a className='w-[32px] h-[32px] flex items-center justify-center gray-bg rounded-full'
                onClick={() => {
                  window.open(`https://m.me/185169981351799?text=Mình đang đọc truyện trên web. Hỗ trợ giúp mình với.`, "_blank", "Toidoc");
                }}
              >
                <img src='/images/ic_feedback.svg' className='w-[24px]' alt='Góp ý truyện fulll' title='Góp ý truyện full'/>
              </a>
              {/*<a className='w-[32px] h-[32px] flex items-center justify-center gray-bg rounded-full ml-[20px]'
                // onClick={() => {
                //   Router.push(`/tim-kiem-truyen`)
                // }}
                href='/tim-kiem-truyen' title='Tìm kiếm các thể loại truyện full hay'
              >
                <img src='/images/ic_search.svg' className='w-[24px]' alt='Tìm kiếm các thể loại truyện full hay' title='Tìm kiếm các thể loại truyện full hay'/>
              </a>*/}
            </div>
          </div>
          <a onClick={(e) => handleClick(e, 'button-contact-big-banner')} >
            <img src='/images/download-app/banner-tai-app-min.jpg' />
          </a>
          <div className='contact-info'>
            <p className='contact-title'>Thông tin liên hệ</p>
            <p className='contact-subtitle'>- Địa chỉ: <span className='contact-label'>RX5, Đ. An Phú Villa, Dương Kinh, Hà Đông, Hà Nội </span></p>
            <p className='contact-subtitle'>- Email: <span className='contact-label'><a href="mailto:toidoc.io@gmail.com">toidoc.io@gmail.com</a></span></p>
            <p className='contact-subtitle'>- Chat Support: <span className='contact-label'><a href='https://m.me/185169981351799?text=Mình đang đọc truyện trên web. Hỗ trợ giúp mình với.' rel='nofollow'>https://m.me/185169981351799</a></span></p>
          </div>
        </div>
      </div>
    </CommonLayout>
  )
}

export default observer(Contact)
