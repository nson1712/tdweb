import React, { useMemo, useRef } from 'react'
import Slider from 'react-slick'
import classNames from 'classnames'


const SliderComponent = ({data,
  slidesToShow = 1,
  slidesToScroll = 1,
  rows = 1,
  slidesPerRow = 1,
  children,
  title,
  headStyle
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
        breakpoint: 1024,
        settings: {
          rows: 1,
          slidesPerRow: 2,
          slidesToShow: data?.length < slidesToShow ? data?.length : 2,
          slidesToScroll: data?.length < slidesToShow ? data?.length : 2,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          rows: 1,
          slidesPerRow: 1,
        }
      },
    ]
  }), [data]);

  return (
    <div>
      <div className={classNames('flex items-center justify-between mb-[24px]', headStyle)}>
        {title}
        <div className='flex items-center'>
          <a className='flex items-center justify-center w-[40px] h-[40px] mr-[8px] border-[2px] border-color arrow rounded-[20px] cursor-pointer'
            onClick={() => {
              ref?.current?.slickPrev()
            }}
          >
            <i className='fas fa-arrow-left text-white'/>
          </a>
          <a className='flex items-center justify-center w-[40px] h-[40px] border-[2px] border-color arrow rounded-[20px] cursor-pointer'
            onClick={() => {
              ref?.current?.slickNext()
            }}
          >
            <i className='fas fa-arrow-right text-white'/>
          </a>
        </div>
      </div>
      <div className='mx-[-15px]'>
        {data && data.length > 0
          && <Slider {...settings} ref={ref}>
            { children }
          </Slider>
        }
      </div>
      
    
    </div>
  )
}

export default SliderComponent
