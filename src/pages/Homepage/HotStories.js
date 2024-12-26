import React, { useState } from 'react'
import Slider from 'react-slick'
import Router from 'next/router'
import classNames from 'classnames'
import { formatStringToNumber } from '../../utils/utils'

const settings = {
  dots: false,
  infinite: false,
  arrows: false,
  speed: 500,
  autoPlay: true,
  slidesToShow: 8.2,
  slidesToScroll: 8,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 4.2,
        slidesToScroll: 4,
        rows: 1,
        slidesPerRow: 1,
      }
    },
  ]
}

const HotStories = ({data}) => {
  const [currentIndex, setCurrentIndex] = useState(0)



  return (
    <div className='mb-[48px] px-[20px]'>
      <h1 className='text-[18px] font-bold main-text mb-[4px] leading-[16px]'>
        Gợi ý cho bạn
      </h1>
      <p className='text-[12px] label-text mb-[10px] leading-[16px]'>
        Hot nhất dựa trên các thể loại mà bạn đang theo dõi
      </p>
      <div className='bg-hot-news rounded-[10px] pt-[15px] pl-[15px] pb-[20px]'>
      {data && data.length > 0
        && <Slider {...settings}
          
        >
          {data.map((item, i) => (
            <div
              onClick={() => setCurrentIndex(i)}
              key={item.id}
            >
              <div  className='flex items-center justify-center w-[75px] h-[98px]'
              >
                <img className={classNames('coverImage object-cover rounded-[10px] overflow-hidden', currentIndex === i ? 'w-[75px] h-[98px] border-w-[1px] border-white' : 'w-[65px] h-[85px]')}
                  src={item.coverImage}
                  alt={`Truyện ${item.title}`} title={item.title}
                />
              </div>
            </div>
              
           
          ))}

        </Slider>
      }

      <div className='flex items-center mt-[15px] justify-between pr-[15px]'
        // onClick={() => {
        //   Router.push(`/${data[currentIndex]?.slug}`)
        // }}
      >
        <a href={`/${data && data[currentIndex]?.slug}`} className='text-[18px] font-semibold mb-0 leading-[22px] text-white flex-1 pr-[20px] underline' title={`${data && data[currentIndex]?.title}`}>
          {data && data[currentIndex]?.title}
        </a>
        <p className={classNames('text-[12px] font-medium leading-[16px] label-text flex items-center mb-0')}>
            {formatStringToNumber(data && data[currentIndex]?.rate)}
            <img src='/images/star.svg' className='w-[12px] ml-[4px]' alt={`Đánh giá truyện ${data && data[currentIndex]?.title}`} title={`Đánh giá truyện ${data && data[currentIndex]?.title}`}/>
          </p>
      </div>
      </div>
      
    </div>
  )
}

export default HotStories
