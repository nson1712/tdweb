import React from 'react';
import Button from '../../components/Button';
import { formatStringToNumber } from '../../utils/utils';

const PriceInfo = ({discountValue, finalChargeValue, storyDetail, handleOpenFullChapter}) => {

  return (
    <div className='align-center'>
      <div className='box-price-full-story'>
        <div className="box-price-full-story-border">
          <div className='flex flex-col items-center justify-between text-center h-full'
          >
            <p
              className="white-text mt-2.5 mr-5 ml-5 font-bold text-xl"
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
              className="bg-gradient-to-r from-[#FFE279] to-[#DA9226] text-white py-2.5 px-5 text-base font-bold rounded-md animate-shimmer hover:-translate-y-2 transition delay-100"
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
