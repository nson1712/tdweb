import React from 'react'
import classNames from 'classnames'

const Divider = ({className}) => {
  return (
    <div className={classNames('divider w-full h-[1px]', className)}/>
  )
}

export default Divider
