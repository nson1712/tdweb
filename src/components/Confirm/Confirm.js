import React, { Component } from 'react'
import classNames from 'classnames'
import classes from './Confirm.module.scss'

export default class Confirm extends Component {
  handleCancel = () => {
    const { confirmData, handleClose } = this.props
    handleClose()
    if (confirmData.handleCancel) {
      confirmData.handleCancel()
    }
  }

  handleOk = () => {
    const { confirmData, handleClose } = this.props
    handleClose()
    if (confirmData.handleOk) {
      confirmData.handleOk()
    }
  }

  render() {
    const { confirmData, handleClose } = this.props
    return (
      <div className={classNames(classes.container, 'modal-body relative')}>
         <a className='w-[48px] h-[48px] flex items-center justify-center border-[1px] border-color absolute top-[20px] right-[40px] z-9'
          onClick={handleClose}
        >
          <i className='fas fa-times w-[12px] main-text'/>
        </a>
        {confirmData.title && (
          <p className={classes.title}>{confirmData.title}</p>
        )}

        <p className={classes.description}>{confirmData.description}</p>
        <div className={classes.actions}>
          {confirmData.type !== 'ALERT' && (
            <a className={classes.btnCancel} onClick={this.handleCancel}>
              {confirmData.leftText || 'Cancel'}
            </a>
          )}

          <a className={classes.btnOk} onClick={this.handleOk}>
            {confirmData.rightText || 'Ok'}
          </a>
        </div>
      </div>
    )
  }
}
