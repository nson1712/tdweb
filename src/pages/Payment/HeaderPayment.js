import React from 'react'

const HeaderPayment = () => {
  return (
    <div className='bg-header-payment p-[20px]'>
      <div>
        <img src='/images/logo-toidoc.svg' className='mr-[24px] md:block cursor-pointer w-[50px] fl'
          onClick={() => {
            Router.push('/')
          }}
          alt='logo'
        />
        <div style={{'float': 'left', 'marginTop': '15px'}}>
          <p style={{'fontSize': '16px', 'fontWeight': '700'}}>Top #1 Nền Tảng Đánh Giá Truyện</p>
        </div>
      </div>
    </div>
  )
}

export default HeaderPayment
