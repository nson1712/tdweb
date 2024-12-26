import React from 'react'
import ContactComponent from '../src/pages/Contact'
import HeaderServer from '../src/components/HeaderServer'

const Library = () => {
  return (
    <>
      <HeaderServer description="Thông tin liên hệ và địa chỉ văn phòng của Toidoc"/>
      <ContactComponent />
    </>
  )
}

export default Library
