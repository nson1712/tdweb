import React from 'react'
import Header from '../../components/Header/Header'
import CommonLayout from '../../layouts/CommonLayout/CommonLayout'
import Button from '../../components/Button'
import { observer } from 'mobx-react'
import StoryStore from '../../stores/StoryStore'
import GlobalStore from '../../stores/GlobalStore'

const Contact = () => {

  const {
    saveCustomerClickBanner,
  } = StoryStore
  
  const handleClick = (e, code) => {
    // saveCustomerClickBanner(code)
    window.open('https://toidoc.onelink.me/59bO/d42503wz', '_blank', 'Toidoc')
  }
  return (
    <>
      <div>
        <Header selectedTab={'CONTACT'}/>
        <div className='home-content pt-[16px] pt-[10px] px-[50px]'>
          <p><strong>Hiện tại Toidoc cung cấp 2 kênh Hỗ Trợ chính thức</strong></p>
          <Button
            className="btnSecond-Second"
            onClick={() => {
              window.open(
                `https://m.me/185169981351799?text=${GlobalStore.profile?.referralCode ? 'Mã KH của mình là: ' + GlobalStore.profile?.referralCode + '. ' : ''}Mình đang sử dụng web, hỗ trợ giúp mình với.`,
                "_blank",
                "Toidoc"
              );
            }}
          >
            <img src='/images/messenger.png' className='mr-[5px] w-[24px]'/>
            Liên hệ hỗ trợ Messenger
          </Button>
          <Button
              className="btnSecond-Second"
              onClick={() => {
                window.open(
                  `https://zalo.me/+84931191459`,
                  "_blank",
                  "Toidoc"
                );
              }}
            >
              <img src='/images/icons8-zalo-48.png' className='mr-[5px] w-[24px]'/>
              Liên hệ hỗ trợ ZALO
          </Button>
        </div>
      </div>
    </>
  )
}

export default observer(Contact)
