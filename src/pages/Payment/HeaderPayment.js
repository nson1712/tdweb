import Router from 'next/router'
import React from 'react'

const HeaderPayment = () => {
  return (
    <div className='text-white rounded-b-sm bg-header-payment shadow-md bg-gradient-to-br from-[#ADF7F2] to-[#15AAFF] p-3 mb-2'>
      <div>
        <img src='/images/logo-toidoc.svg' className='mr-[24px] md:block cursor-pointer w-[50px] fl'
          onClick={() => {
            Router.push('/')
          }}
          alt='logo'
        />
        <div style={{'float': 'left', 'marginTop': '15px'}}>
          <p className='text-md font-bold'>Top #1 Nền Tảng Truyện Dành Cho Phái Đẹp</p>
        </div>
      </div>
    </div>
  )
}

export default HeaderPayment
