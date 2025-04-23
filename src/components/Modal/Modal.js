import React, {useEffect, useMemo, useState} from "react";
import { Modal } from 'react-bootstrap'
import { isMobile } from "react-device-detect";

const ModalComponent = ({ show, handleClose, title, children, className, isCountDown, countDownTime, styleBody}) => {

  const [time, setTime] = useState(countDownTime || 10)
  
  const handleOnHide = () => {
    if (!isCountDown || (isCountDown && time <= 0)) {
      handleClose()
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
        setTime(time => time !== 0 ? time - 1 : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [show]);


  return (
    <Modal show={show} 
      onHide={handleOnHide}
      centered
      className={className}
      backdropClassName="modal-backdrop-show"
    >
      <div className={`modal-body ${styleBody}`}>
        { title ? 
          <div className='flex items-center justify-between mb-[16px] mx-[4px] md:mx-[24px] mt-[0]'>
            <h3 className='mb-0 text-[20px] lg:text-[32px] font-bold main-text'>
              { title }
            </h3>
            {isCountDown && time > 0 ?
              <div className="items-center justify-center iconCountDown"><p className="text-[20px] main-text">{time}</p></div>
            :
              <a className='flex items-center justify-center'onClick={handleClose}>
                <i className='fas fa-times text-[20px] main-text'/>
              </a>
            } 
          </div>

          : 
          isCountDown && time > 0 ?
            <div className="items-center justify-center iconCountDown"><p className="text-[20px] main-text">{time}</p></div>
          :
          <a className="items-center justify-center iconCloseModal" onClick={handleClose}>
            <i className="fas fa-times text-[20px] main-text"/>
          </a> 
        }

        { children }
      </div>
    </Modal>
  )
}

export default ModalComponent
