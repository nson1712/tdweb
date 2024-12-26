import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import ProfileStore from '../../stores/ProfileStore'

const NftCollection = ({item}) => {
  return (
    <div className={'px-[15px] max-w-[500px]'}
      onClick={() => {
        Router.push(`/collection/${item._id}`)
      }}
    >
      <div className={'w-full mb-[8px]'}>
        <img className='w-full rounded-[10px]' src={'/images/example.png'} alt='img'/>
      </div>
      <div className='flex items-center justify-between mb-[12px]'>
        <div className='flex-1'>
          <img src='/images/example.png' className='w-full rounded-[10px]' alt='img'/>
        </div>
        <div className='flex-1 mx-[8px]'>
          <img src='/images/example.png' className='w-full rounded-[10px]' alt='img'/>
        </div>
        <div className='flex-1'>
          <img src='/images/example.png' className='w-full rounded-[10px]' alt='img'/>
        </div>
      </div>
      <p className='text-[24px] leading-[32px] font-bold text-white mb-[12px]'>
        {item?.name}
      </p>
      <div className='flex items-center justify-between'>
        <a className='flex items-center'
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              Router.push(ProfileStore.profileId !== item.owner?._id ? `/user/${item?.owner?._id}` : '/profile/collected')
            }}
          >
            <img src={item?.owner?.avatar || '/images/logo.png'} className='w-[24px] rounded-[12px] mr-[12px] '/>
            <p className='mb-0 font-bold text-[14px] leading-[32px] text-white'>
              <span className='font-normal'>By</span> {item?.owner?.firstName} {item?.owner?.lastName}
            </p>
          </a>

        <div className={'h-[28px] px-[8px] flex items-center justify-center text-[12px] font-semibold primary-text uppercase border-[1px] border-primary rounded-[4px]'}>
          {item?.nfts?.length} items
        </div>
        
      </div>
    </div>
  )
}

export default NftCollection
