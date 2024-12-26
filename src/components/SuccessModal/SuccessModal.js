import Link from 'next/link'
import React from 'react'
import { Modal } from 'react-bootstrap'

const SuccessModal = ({ show, handleClose, title, description, className }) => {
  return (
    <Modal show={show}
      onHide={handleClose}
      centered
      className={className}
    >
      <div className='modal-body relative'>
        <a className='w-[48px] h-[48px] flex items-center justify-center border-[1px] border-color absolute top-[40px] right-[40px] z-9'
          onClick={handleClose}
        >
          <i className='fas fa-times w-[12px] main-text'/>
        </a>

        <div className='pt-[70px] pb-[48px] px-[65px]'>
          <img src='/images/success.svg' className='w-[110px] mb-[30px] mx-auto' />
          <p className='text-center text-[24px] leading-[32px] font-semibold main-text mb-[16px]'>
            {title || 'Upload Success'}
          </p>
          <p className='text-center text-[18px] leading-[160%] label-text mb-[16px]'>
            {description}
          </p>
          <div className='mb-[30px] w-full h-[1px] bg-border'/>
          <p className='text-center text-[18px] leading-[160%] label-text mb-[22px]'>
            Share your product
          </p>
          <div className='flex items-center justify-center mb-[32px]'>
            <a className='mx-[12px]'>
              <img src='/images/facebook.svg' className='w-[20px]'/>
            </a>
            <a className='mx-[12px]'>
              <img src='/images/instagram.svg' className='w-[20px]'/>
            </a>
            <a className='mx-[12px]'>
              <img src='/images/twitter.svg' className='w-[20px]'/>
            </a>
          </div>
          <Link href='/profile/nft-assets'>
            <a className='btnMain'>
              Discover
            </a>
          </Link>
          
        </div>

        
      </div>
    </Modal>
  )
}

export default SuccessModal
