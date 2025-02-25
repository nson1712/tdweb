import React from 'react';
import Button from '../../components/Button';
import GlobalStore from '../../stores/GlobalStore';
import { formatStringToNumber } from '../../utils/utils';

const OpenInAppInfo = ({handleSupport, chapterDetail, storyDetail, handleOpenChapter}) => {

  return (
    <>
      <div className='box-login'>
        <h3 className='white-text' style={{'margin': 'auto', 'fontWeight': 'bold', 'marginBottom': '10px'}}>CHÚ Ý !</h3>
        {GlobalStore.isLoggedIn && GlobalStore.profile?.subscription && !chapterDetail?.isFree ?
          <>
            <p className='white-text'>Quyền lợi tài khoản PREMIUM của bạn chỉ áp dụng trên APP Toidoc. Các bạn mở App Toidoc hoặc tải App theo lựa chọn bên dưới nhé</p>
            
            <div style={{'margin': 'auto'}}>
              <a href='https://toidoc.onelink.me/59bO/d42503wz'>
                <img src='/images/apple-icon-min.png' style={{'float': 'left', 'marginRight': '10px', 'width': '135px'}}/>
              </a>
              <a href='https://toidoc.onelink.me/59bO/d42503wz'>
                <img src='/images/android-icon-min.png'  style={{'float': 'left', 'marginRight': '10px', 'width': '135px'}}/>
              </a>
            </div>
            <div className = 'split-line my-[15px]'/>
            {chapterDetail?.price > 0 &&
              <div style={{display: 'inline-block', margin: '0'}}>
              <p
                className="white-text"
                style={{display: 'inline', margin: '0'}}
              >
                {`Nếu vẫn cần đọc chương này trên Website, bạn vui lòng ủng hộ ${formatStringToNumber(chapterDetail?.price)}`}
              </p>
              <img
                src={
                  storyDetail?.contributorId
                    ? '/images/red-diamond.png'
                    : '/images/blue-diamond.png'
                }
                style={{display: 'inline-block', verticalAlign: 'middle', marginLeft: '5px'}}
              />
              </div>
            }
            <a id='open-chapter-btn' style={{'marginTop': '30px', 'display': 'flex', 'justifyContent': 'center'}}>
              <Button onClick={() => handleOpenChapter()} className='button-open-chapter'>Mở khoá chương</Button>
            </a>
            
          </>
          
          : 
          <>
            <p className='white-text'>Hiện tại nội dung chương này chỉ được đọc trên ứng dụng Toidoc. Các bạn hãy mở App Toidoc hoặc tải App theo lựa chọn bên dưới nhé</p>
            <div style={{'margin': 'auto'}}>
              <a href='https://toidoc.onelink.me/59bO/d42503wz'>
                <img src='/images/apple-icon-min.png' style={{'float': 'left', 'marginRight': '10px', 'width': '135px'}}/>
              </a>
              <a href='https://toidoc.onelink.me/59bO/d42503wz'>
                <img src='/images/android-icon-min.png'  style={{'float': 'left', 'marginRight': '10px', 'width': '135px'}}/>
              </a>
            </div>
          </>
          
        }
        {/*<div>
          <p className='white-text mt-[20px]'>Hoặc bạn cần hỗ trợ? Hãy 👆 vào nút hỗ trợ bên dưới nhé </p>
          <div style={{'marginTop': '20px', 'display': 'flex', 'justifyContent': 'center'}}>
            <Button onClick={() => handleSupport()} className='button-support-chapter' style={{'padding': '10px 20px'}}>
              <img src='/images/messenger.png' className='fl' style={{'width': '20px', 'height': '20px', 'marginRight': '10px'}}/>Hỗ trợ
            </Button>
          </div>
        </div>*/}
      </div>
    </>
  )
}


export default OpenInAppInfo;
