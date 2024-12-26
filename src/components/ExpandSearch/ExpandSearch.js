import React, { useState, useEffect } from 'react'
import Expand from 'react-expand-animated'
import classNames from 'classnames'

const ExpandComponent = ({title, openDefault = false, children}) => {
  const [ openContent, setOpenContent ] = useState(openDefault)

  useEffect(() => {
    if (openDefault) {
      setOpenContent(openDefault)
    }
   
  }, [openDefault])

  return (
    <div >
      <div className='flex items-center justify-between cursor-pointer pb-[10px] border-b-[1px] border-search-color'
        onClick={() => {
          setOpenContent((prev) => !prev)
        }}
      >
        <h2 className='mb-0 text-[18px] font-bold leading-[26px] text-white'>
          {title}
        </h2>
        <i className={classNames('fas fa-chevron-down text-white arrow-square text-[11px]', openContent && 'arrow-square-open')}/>
        
      </div>

      <Expand open={openContent} duration={300}>
        <div className='pt-[20px]'>
          { children }
        </div>
        
      </Expand>
    </div>
  )
}

export default ExpandComponent
