import React, { useMemo, useRef } from 'react'
import Slider from 'react-slick'
import classNames from 'classnames'
import StoryItem from '../StoryItem/StoryItem'
import Router from 'next/router'


const SlideStories = ({
  data,
  slidesToShow = 6,
  slidesToScroll = 1,
  rows = 1,
title,
  categoryCode,
  url
}) => {
  const ref = useRef()

  const slideSetting = {
    slidesToShow: data?.length < slidesToShow ? data?.length : slidesToShow,
    slidesToScroll: data?.length < slidesToShow ? data?.length : slidesToScroll,
  }

  if (rows > 1) {
    slideSetting = {
      rows: rows,
      slidesPerRow: slidesPerRow
    }
  }
  
  const settings = useMemo(() => ({
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    autoPlay: false,
    ...slideSetting,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2.9,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
          rows: 1,
          slidesPerRow: 1,
        }
      },
    ]
  }), [data]);

  return (
    <div>
      <div className={classNames('flex items-center justify-between pmb-[8px] px-[16px]')}>
        <h1 className='text-[20px] font-bold main-text leading-[20x] mb-0'>
        {title}
        </h1>
        
       <a className='link-color text-[14px] leading-[16px] font-semibold' title={`Truyện ${title}`}
        onClick={() => {
          Router.push(url || `/the-loai/${categoryCode}`)
        }}
       >
        Xem thêm
       </a>
      </div>
      <div className='px-[8px] flex flex-row flex-wrap'>
        {data?.slice(0, 16).map((item) => (
          <div key={item.id} className='px-[8px] w-[25%] md:w-[25%] py-[8px]'>
            <StoryItem item={item} fromSlide={true}/>
          </div>
        ))}
      </div>
      
    
    </div>
  )
}

export default SlideStories
