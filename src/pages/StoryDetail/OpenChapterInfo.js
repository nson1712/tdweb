import React from 'react';
import Button from '../../components/Button';
import { formatStringToNumber } from '../../utils/utils';

const OpenChapterInfo = ({story, chapter, handleOpenChapter, handleSupport, availableCash}) => {
  
  return (
    <>
      <div className='box-login'>
        <p className='white-text' style={{'margin': '10px 20px', 'fontWeight': 'bold'}}>
          <span className='fl mr-[5px]'>Chương này nhà đăng đặt khoá.</span>
          <span className='fl mr-[5px]'>Hãy ủng hộ</span>
          <span className='fl mr-[5px]'>{formatStringToNumber(chapter?.price)}</span>
          <span className='fl  mr-[5px]'><img src={story?.contributorId ? '/images/red-diamond.png' : '/images/blue-diamond.png'} style={{'width': '25px'}}/></span>
          để đọc tiếp!
        </p>
        <div style={{'margin': '30px 10px', 'borderTop': '1px solid #fff'}}></div>
        {!story?.contributorId && 
          <>
            <div className='diamond-info'>
              <img src='/images/icon-check.png' style={{'width': '20px', 'marginRight': '5px'}}/>
              <p style={{'margin': '0px', 'fontSize': '14px', 'color': '#fff'}}>
              <span className='fl mr-[5px]'>Bạn có thể nạp kim cương</span>
              <span className='fl  mr-[5px]'><img src='/images/red-diamond.png' style={{'width': '15px', 'marginTop': '9px'}}/></span>
              để mở khoá chương này
              </p>
            </div>
            <div className='diamond-info'>
              <img src='/images/icon-check.png' style={{'width': '20px', 'marginRight': '5px'}}/>
              <p style={{'margin': '0px', 'fontSize': '14px', 'color': '#fff'}}>
                <span className='fl mr-[5px]'>Nếu thiếu</span>
                <span className='fl  mr-[5px]'><img src='/images/blue-diamond.png' style={{'width': '15px', 'marginTop': '9px'}}/></span>
                <span className='fl mr-[5px]'>hệ thống sẽ tự quy đổi từ </span>
                <span className='fl  mr-[5px]'><img src='/images/red-diamond.png' style={{'width': '15px', 'marginTop': '9px'}}/></span>
                <span>theo tỉ lệ 1:1 khi ấn mở khoá chương. </span>
              </p>
            </div>
          </>
          
        }
        <div className='diamond-info'>
          <img src='/images/icon-check.png' style={{'width': '20px', 'marginRight': '5px'}}/>
          <p style={{'margin': '0px', 'fontSize': '14px', 'color': '#fff'}}>Bạn có thể "Đọc lại chương" của truyện này nhiều lần mà không cần ủng hộ thêm kim cương.</p>
        </div>
        <div className='diamond-info'>
          <img src='/images/icon-check.png' style={{'width': '20px', 'marginRight': '5px'}}/>
          <p style={{'margin': '0px', 'fontSize': '14px', 'color': '#fff'}}>Nếu truyện chưa hoàn, thì bạn cần ủng hộ thêm kim cương cho chương mới.</p>
        </div>
        {story?.contributorId && <div className='diamond-info'>
          <img src='/images/icon-check.png' style={{'width': '20px', 'marginRight': '5px'}}/>
          <p style={{'margin': '0px', 'fontSize': '14px', 'color': '#fff'}}>
          <span className='fl mr-[5px]'>Bạn có thể kiếm kim cương</span>
          <span className='fl mr-[5px]'>{chapter?.price}</span>
          <span className='fl  mr-[5px]'><img src='/images/red-diamond.png' style={{'width': '15px', 'marginTop': '9px'}}/></span>
          <span className=''>từ bình chọn truyện trên App. Tham khảo </span>
          <span className=''><a href='https://docgia-guide.toidoc.vn/ve-vang' style={{'color': '#03effd', 'textDecoration': 'underline'}}>Tại đây</a>!</span>
          </p>
        </div>}
        <a id={chapter?.price <= availableCash?.balance ? 'open-chapter-btn' : 'deposit-diamond-btn'} style={{'marginTop': '30px', 'display': 'flex', 'justifyContent': 'center'}}>
          <Button onClick={() => handleOpenChapter()} className='button-open-chapter'>{chapter?.price <= availableCash?.balance ? 'Mở khoá chương' : 'Nạp kim cương'}</Button>
        </a>
        <div style={{'marginTop': '30px', 'display': 'flex', 'justifyContent': 'center'}}>
         
          <Button onClick={() => handleSupport()} className='button-support-chapter' style={{'padding': '10px 20px'}}>
            <img src='/images/messenger.png' className='fl' style={{'width': '20px', 'height': '20px', 'marginRight': '10px'}}/>Hỗ trợ
          </Button>
        </div>
      </div>
    </>
  )
}


export default OpenChapterInfo;
