import React from 'react';
import Button from '../../components/Button';
import { formatStringToNumber } from '../../utils/utils';

const PriceInfo = ({discountValue, finalChargeValue, storyDetail, handleOpenFullChapter}) => {

  return (
    <div className='align-center'>
      <div className='box-price-full-story'>
        <div className="box-price-full-story-border">
          <div
            style={{
              display: "flex",
              flexDirection: "column", // Xếp các phần tử theo cột
              alignItems: "center", // Căn giữa theo chiều ngang
              justifyContent: "center", // Căn giữa theo chiều dọc
              textAlign: "center", // Căn giữa nội dung văn bản
              height: "100%", // Đảm bảo phần tử bao phủ toàn bộ chiều cao
            }}
          >
            <p
              className="white-text"
              style={{
                margin: "10px 20px 0px 20px",
                fontWeight: "bold",
                fontSize: '20px',
              }}
            >
              <span className="fl mr-[5px]">
                {`Ủng Hộ ${formatStringToNumber(finalChargeValue)}`}
              </span>
              <img
                src={
                  storyDetail?.contributorId
                    ? "/images/red-diamond.png"
                    : "/images/blue-diamond.png"
                }
                className="fl w-[25px] mr-[5px]"
                style={{
                  display: "inline-block",
                  verticalAlign: "middle", // Căn giữa icon với text
                }}
              />
            </p>
            <p className="white-text mt-[3px]">
              {`Để mở khoá toàn bộ chương truyện ${storyDetail?.title}`}
            </p>
          </div>
          {discountValue > 0 && (
            <p className="white-text text-center" style={{color: '#E9B147'}}>
              <i>
                  {`Tiết kiệm hơn ${formatStringToNumber(discountValue)} so với mở từng chương. `}
              </i>
            </p>
          )}
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center", // Căn giữa nút
            }}
          >
            <Button
              onClick={() => handleOpenFullChapter()}
              className="button-open-chapter-summary"
            >
              Mở Tất Cả Chương
            </Button>
            
          </div>
          {storyDetail?.status === 'PENDING' && <p className='white-text mt-[10px]'><i>(Chú ý: Chỉ mở toàn bộ chương nhà đăng đã phát hành)</i></p>}
        </div>
      </div>
  
    </div>
  )
}


export default PriceInfo;
