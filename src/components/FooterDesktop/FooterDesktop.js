import React from 'react'

const FooterDesktop = () => {
  return (
    <div className='bg-footer mt-[50px] p-[20px]'>
      <div>
        <img src='/images/logo-toidoc.svg' className='mr-[24px] hidden md:block cursor-pointer w-[50px] fl'
          onClick={() => {
            Router.push('/')
          }}
          alt='logo'
        />
        <div style={{'maxWidth': '129px', 'float': 'left'}}>
          <p style={{'fontSize': '12px'}}>Top #1 Nền Tảng Đánh Giá Truyện</p>
          <a href='https://toidoc.onelink.me/59bO/d42503wz' target='_blank' rel="nofollow">
            <p style={{'fontWeight': '700', 'fontSize': '12px'}}>Tải xuống ngay</p>
          </a>
        </div>
      </div>
      
      <div style={{'marginLeft' : '16px', 'marginTop': '15px', 'marginBottom': '24px', 'float': 'left'}}>
        <a href='https://toidoc.onelink.me/59bO/d42503wz' target='_blank' rel="nofollow">
          <img src='/images/android-icon-min.png' style={{'width': '95px', 'float': 'left', 'marginRight': '24px'}}/>
          <img src='/images/apple-icon-min.png' style={{'width': '95px', 'float': 'right'}}/>
        </a>
      </div>

      <div style={{'float': 'right'}}>
        <img src='/images/messenger.png' className='mr-[24px] hidden md:block cursor-pointer w-[50px] fl'
          onClick={() => {
            window.open(`https://m.me/185169981351799?text=Mình đang đọc truyện trên web. Hỗ trợ giúp mình với.`, "_blank", "Toidoc");
          }}
          alt='logo'
        />
        <p style={{'fontSize': '12px', 'fontWeight': '700', 'marginLeft': '5', 'marginTop': '10px'}}>Hỗ trợ</p>
      </div>
    </div>
  )
}

export default FooterDesktop
