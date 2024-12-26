import Router from 'next/router'
import React, { useState } from 'react'
import { formatStringToNumber, getInDate } from '../../utils/utils'
import { SYMBOL_TO_IMAGE } from '../../utils/constants'
import Link from 'next/link'
import Button from '../Button'
import * as Api from '../../api/api'
import GlobalStore from '../../stores/GlobalStore'
import moment from 'moment'
import { observer } from 'mobx-react'
import PriceStore from '../../stores/PriceStore'

const NftItem = ({item = {}, from, refreshNfts, currentTime}) => {
  const [ loading, setLoading ] = useState(false)

  const { prices } = PriceStore

  const handleCancelListing = () => {
    GlobalStore.handleShowConfirmDialog({
      title: 'Confirm',
      description: 'Do you want cancel listing this nft?',
      handleOk: async () => {
        try {
          setLoading(true)
    
          await Api.deleteData({
            url: '/nft/listing-nft',
            params: {
              nftId: item._id
            }
          })
    
          setLoading(false)

          if (refreshNfts) {
            refreshNfts()
          }
        } catch(e) {
          setLoading(false)
        }
      }
    })
   
  }

  console.log('currentTime', currentTime, item?.sellParams?.startDate)

  return (
    <div className='rounded-[16px] bg-main p-[11px] lg:m-[15px]'
      onClick={() => {
        Router.push(`/nft/${item._id}`)
      }}
    >
    <div className='lg:h-[360px] mb-[21px] relative'>
      <img src={item.image} className='w-full h-full object-cover rounded-[16px] object-top' alt='img'/>
      <div className='w-[40px] h-[40px] flex items-center justify-center rounded-[4px] bg-border absolute top-[16px] left-[20px]'>
        <img src='/images/photo.png' className='w-[24px]'/>
      </div>
      { from === 'LISTING'
        && <>
        <Button className='pl-[14px] pr-[8px] h-[40px] flex items-center justify-center rounded-[4px] bg-border absolute bottom-[18px] right-[20px] cursor-pointer'
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleCancelListing()
          }}
          loading={loading}
        >
          <i className='w-[20px] mr-[2px] fas fa-circle-xmark text-white'/>
          <span
            className='text-[14px] font-semibold text-white '
          >Cancel</span>
        </Button>
        { (item.sellParams?.sellMethod === 'SET_PRICE' || currentTime < item?.sellParams?.startDate)
          &&
          <a className='pl-[14px] pr-[8px] h-[40px] flex items-center justify-center rounded-[4px] bg-border absolute bottom-[18px] left-[20px] cursor-pointer'
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                Router.push(`/list-nft/${item._id}`)
              }}
            >
              <i className='w-[20px] mr-[2px] fas fa-edit text-white'/>
              <span
                className='text-[14px] font-semibold text-white '
              >Edit</span>
            </a>
            
        }
        
        </>
      }
      
    </div>
    <div className='flex items-center justify-between mb-[8px]'>
      <p className='flex-1 mr-[10px] text-[18px] leading-[24px] font-semibold text-white mb-0'>
       {item.name}
      </p>
      <div className='h-[26x] px-[8px] flex items-center justify-center rounded-[4px] secondary-bg text-[12px] font-bold primary-text'>
        {item.network}
      </div>

    </div>

    <div className='flex items-center justify-between pb-[8px] mb-[8px] border-b-[1px] border-color'>
      <div className='flex items-center'>
        <p className='mb-0 text-gray text-[14px] leading-[24px] mr-[8px]'>
          { item?.sellParams?.sellMethod === 'SET_PRICE'
            ? 'Current bid' : 'Highest Bid'
          }
          
        </p>
        <img src='/images/bid.png' className='w-[17px]'/>
      </div>
      <div className='flex items-start'>
        <img src={SYMBOL_TO_IMAGE[item?.sellParams?.priceCurrency]} className='w-[24px] mr-[8px]'/>
        <div className='text-right'>
          <p className='text-[14px] font-semibol leading-[24px] text-white mb-[2px]'>
            { item?.sellParams?.sellMethod === 'SET_PRICE' ? `${formatStringToNumber(item?.sellParams?.setPrice)} ${item?.sellParams?.priceCurrency}` : `${formatStringToNumber(item?.sellParams?.buyoutPrice)} ${item?.sellParams?.buyoutPriceCurrency}`}
          </p>
          <p className='text-[12px] font-semibol leading-[20px] label-text mb-0'>≈ $ { formatStringToNumber(item?.sellParams?.sellMethod === 'SET_PRICE' ? `${item?.sellParams?.setPrice * prices[item?.sellParams?.priceCurrency]}` : `${item?.sellParams?.buyoutPrice * prices[item?.sellParams?.buyoutPriceCurrency]}`)}</p>
        </div>
      </div>
      
    </div>

    <div className='flex items-center justify-between'>
      <div className='flex items-center'>
        <img src='/images/timer.svg' className='w-[12px] mr-[4px]'/>
        <p className='text-[12px] font-semibold label-text mb-0'>
          {moment.unix(item?.sellParams?.endDate).fromNow()}
        </p>
      </div>
      <div className='flex items-center'>
        <img src='/images/heart.png' className='w-[12px] mr-[8px]'/>
        <p className='text-[12px] font-semibold label-text mb-0'>
          {item.likes || 0}
        </p>
      </div>
    </div>

  </div>
  )
 
}

export default observer(NftItem) 
