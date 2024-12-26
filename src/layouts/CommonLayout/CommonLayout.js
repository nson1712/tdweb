import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import uuid from 'react-uuid';
import classes from './CommonLayout.module.scss'
// import Header from '../../components/Header'
// import Footer from '../../components/Footer'
import { Modal } from 'react-bootstrap'
import GlobalStore from '../../stores/GlobalStore'
import Confirm from '../../components/Confirm'

const CommonLayout = ({children, active}) => {
  const { confirm, showConfirm, handleHideConfirmDialog } = GlobalStore

  useEffect(() => {
    const deviceId = localStorage.getItem('DEVICE_ID')

    if (!deviceId) {
      localStorage.setItem('DEVICE_ID', `${uuid()}-${new Date().valueOf()}`)
    }

  }, [])

  return (
    <div className={classes.container}>
      {/* <div className={classes.header}>
        <Header active={active}/>
      </div> */}
      
      <div className={classes.content}>
        {children}
      </div>
      
      {/* <div className={classes.footer}>
        <Footer />
      </div> */}

      <Modal show={showConfirm} onHide={handleHideConfirmDialog} centered>
        <Confirm handleClose={handleHideConfirmDialog} confirmData={confirm} />
      </Modal>
     
    </div>
  )
}

export default observer(CommonLayout)
