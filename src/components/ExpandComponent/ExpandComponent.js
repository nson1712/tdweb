import React, { useState } from 'react'
import Expand from 'react-expand-animated'
import classNames from 'classnames'

const ExpandComponent = ({title, openDefault = false, children}) => {
  const [ openContent, setOpenContent ] = useState(openDefault)
  return (
    <div >
      <div className='flex items-center justify-between cursor-pointer'
        onClick={() => {
          setOpenContent((prev) => !prev)
        }}
      >
        <h2 className='mb-0 text-[24px] font-bold leading-[32px] text-white'>
          {title}
        </h2>
        <div className='w-[24px] h-[24px] border-[1px] border-primary flex items-center justify-center rounded-[4px]'>
          <i className={classNames('fas fa-chevron-down primary-text arrow-square text-[11px]', openContent && 'arrow-square-open')}/>
        </div>
        
      </div>

      <Expand open={openContent} duration={300}>
        <div className='pt-[28px]'>
          { children }
        </div>
        
      </Expand>
    </div>
  )
}

export default ExpandComponent
