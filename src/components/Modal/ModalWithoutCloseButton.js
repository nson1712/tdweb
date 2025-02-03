import React, {useEffect, useMemo, useState} from "react";
import { Modal } from 'react-bootstrap'
import { isMobile } from "react-device-detect";

const ModalWithoutCloseButton = ({ show, title, children, className, styleBody}) => {


  return (
    <Modal show={show} 
      centered
      className={className}
      backdropClassName="modal-backdrop-show"
    >
      <div className={`modal-body ${styleBody}`}>
        { title && 
          <div className='flex items-center justify-between mb-[16px] mx-[4px] md:mx-[24px] mt-[0]'>
            <h3 className='mb-0 text-[20px] lg:text-[32px] font-bold main-text'>
              { title }
            </h3>
          </div>
        }

        { children }
      </div>
    </Modal>
  )
}

export default ModalWithoutCloseButton
