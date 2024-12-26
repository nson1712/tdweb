import Router from 'next/router'
import React from 'react'

const CollectionItem = ({ item }) => {
  return (
    <div className='collection'
      onClick={() => {
        Router.push(`/collection/${item._id}`)
      }}
    >
      <img src={item.bannerImage} className='w-full rounded-[16px] h-[110px] object-cover' alt='banner'/>
      <div className='mt-[-26px]'>
        <div className='flex justify-center mb-[12px]'>
          <div className='border-[4px] rounded-full w-[52px] h-[52px] border-main'>
            <img src={item.logoImage} className='w-[48px]'/>
          </div>
        </div>
        <p className='text-center mb-[8px] text-[18px] font-semibol text-white leading-[24px]'>
          {item.name}
        </p>
        <div className='flex items-center justify-center mb-[16px]'>
          <p className='text-[14px] leading-[24px] label-text mr-[4px] mb-[0]'>
            Total
          </p>
          <p className='text-[14px] leading-[24px] text-white mr-[24px] mb-[0]'>
            { item.nfts.length }
          </p>
          <p className='text-[14px] leading-[24px] label-text mr-[4px] mb-[0]'>
            For Sale
          </p>
          <p className='text-[14px] leading-[24px] primary-text mb-[0]'>
            { item.nfts.length }
          </p>
        </div>
        <div className='pt-[16px] border-t-[1px] border-color flex items-center justify-between'>
          <div className='flex items-center'>
            <p className='text-[14px] leading-[24px] label-text mr-[4px] mb-[0]'>
              Volume
            </p>
            <p className='text-[14px] leading-[24px] text-white mb-[0]'>
              1,765.98 USD
            </p>
          </div>
          <div className='flex items-center'>
            <p className='text-[14px] leading-[24px] label-text mr-[4px] mb-[0]'>
              Floor Price
            </p>
            <p className='text-[14px] leading-[24px] text-white mb-[0]'>
              2.70 USD
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectionItem
