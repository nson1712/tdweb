import React from 'react';
import Button from '../../components/Button';

const OpenInAppInfo = ({handleSupport}) => {

  return (
    <>
      <div className='box-login'>
        <h3 className='white-text' style={{'margin': 'auto', 'fontWeight': 'bold', 'marginBottom': '10px'}}>Cám ơn bạn đã lựa chọn Toidoc !</h3>
        <p className='white-text'>Hiện tại nội dung chương này chỉ được đọc trên ứng dụng Toidoc. Các bạn hãy tải App theo lựa chọn bên dưới nhé</p>
        <div style={{'margin': 'auto'}}>
          <a href='https://toidoc.onelink.me/59bO/d42503wz'>
            <img src='/images/apple-icon-min.png' style={{'float': 'left', 'marginRight': '10px', 'width': '135px'}}/>
          </a>
          <a href='https://toidoc.onelink.me/59bO/d42503wz'>
            <img src='/images/android-icon-min.png'  style={{'float': 'left', 'marginRight': '10px', 'width': '135px'}}/>
          </a>
        </div>
        <div>
          <p className='white-text mt-[20px]'>Hoặc bạn cần hỗ trợ? Hãy 👆 vào nút hỗ trợ bên dưới nhé </p>
          <div style={{'marginTop': '20px', 'display': 'flex', 'justifyContent': 'center'}}>
            <Button onClick={() => handleSupport()} className='button-support-chapter' style={{'padding': '10px 20px'}}>
              <img src='/images/messenger.png' className='fl' style={{'width': '20px', 'height': '20px', 'marginRight': '10px'}}/>Hỗ trợ
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}


export default OpenInAppInfo;
