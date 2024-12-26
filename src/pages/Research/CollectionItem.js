import React from 'react'
import Router from 'next/router'

const CollectionItem = ({item}) => {
  return (
    <div className='relative h-[70px] rounded-[10px]'
      onClick={() => {
        Router.push(`/bo-suu-tap/${item.slug}`)
      }}
    >
      <div className='bg-story-summary rounded-[10px]' />
      <img src={item.image}  alt={`${item.name}`} title={item.name} className='w-full h-[70px] object-cover absolute top-0 right-0 bottom-0 left-0 rounded-[10px]'/>
      <img src={item.image} className='w-[57px] h-[70px] absolute left-[10px] bottom-[10px] rounded-[5px] z-[2]' alt={`${item.name}`}/>
      <div className='flex-1 relative z-[2] pl-[77px] pr-[10px] pt-[10px]'>
        <p className='text-[12px] font-bold leading-[15px] text-white mb-[4px] line-clamp-2'>
          {item.shortName}
        </p>
        {/* <p className='text-[12px] text-white mb-0'>
          {item.totalStory} truyện
        </p> */}
      </div>
    </div>
  )
}

export default CollectionItem
