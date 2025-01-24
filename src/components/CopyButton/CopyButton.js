import React, { useState, useRef } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Overlay, Tooltip } from 'react-bootstrap'
import classes from './CopyButton.module.scss'

const CopyButton = ({ text, placement }) => {
  const target = useRef(null)
  const [showTooltip, setShowTooltip] = useState(false)
  return (
    <div className={classes.container}>
      <CopyToClipboard
        text={text}
        onCopy={() => {
          setShowTooltip(true)
          setTimeout(() => {
            setShowTooltip(false)
          }, 3000)
        }}
      >
        <img className='w-[20px]' ref={target} src='/images/icon-copy.png'/>
      </CopyToClipboard>
      <Overlay target={target.current} show={showTooltip} placement={placement || 'right'}>
        {(props) => (
          <Tooltip id='overlay-example' {...props}>
            Copied!
          </Tooltip>
        )}
      </Overlay>
    </div>
  )
}

export default CopyButton
