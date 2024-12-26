import React, { useState } from 'react'
import classNames from 'classnames'
import ModalComponent from '../Modal/Modal'

const WrongNetwork = ({className}) => {
  const [showWrongNetworkModal, setShowWrongNetworkModal] = useState(false)

  return (
    <div>
      <div className={classNames('flex items-center justify-center h-[48px] rounded-[4px] px-[20px] wrongNetwork cursor-pointer', className)}
        onClick={() => {
          setShowWrongNetworkModal(true)
        }}
      >
        <img src='/images/pulse.svg' className='w-[16px] mr-[8px]' alt='icon'/>
        Wrong Network
      </div>

      <ModalComponent show={showWrongNetworkModal}
        handleClose={() => {setShowWrongNetworkModal(false)}}
        title='Wrong Network'
      >
        <p className={'text-[20px] font-semibold main-text px-[24px]'}>
          Please connect to the appropriate Binance network.
        </p>
      </ModalComponent>
    </div>
    
  )
}

export default WrongNetwork
