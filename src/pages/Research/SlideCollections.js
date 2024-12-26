import React from 'react'
import Slider from 'react-slick'
import CollectionItem from './CollectionItem'
import classNames from 'classnames'

const settings = {
  dots: false,
  infinite: false,
  arrows: false,
  speed: 500,
  autoPlay: true,
  slidesToShow: 5.2,
  slidesToScroll: 5,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2.2,
        slidesToScroll: 2,
        rows: 2,
        slidesPerRow: 1,
      }
    },
  ]
}

const SlideCollections = ({collections}) => {
  return (
    <div className='mb-[20px] mt-[20px]'>
      <div className={classNames('flex items-center justify-between pb-[16px] px-[16px]')}>
        <h1 className='text-[20px] font-bold main-text leading-[20x] mb-0'>
        Bộ sưu tập hấp dẫn
        </h1>
        
       <a className='link-color text-[14px] leading-[16px] font-semibold' title={`Danh sách bộ sưu tập`} href='/bo-suu-tap'
       >
        Xem thêm
       </a>
      </div>
      <Slider {...settings}
      >
        {collections?.map((item, i) => (
          <div
            key={item.id}
            className='px-[8px] py-[10px]'
          >
            <CollectionItem item={item}/>
          </div>
        ))}
  
      </Slider>
    </div>
  )
}

export default SlideCollections
