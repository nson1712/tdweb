import React from 'react'
import classNames from 'classnames'

const Tabs = ({
  options,
  currentTab,
  setCurrentTab,
  size=''
}) => {
  return (
      <div className={classNames('h-[40px] w-full lg:w-auto lg:h-[48px] p-[4px] rounded-[4px] bg-tab flex items-center', size === 'sm' && 'h-[40px] w-full')}>
        { options.map((option) => (
          <div key={option.value}
            className={classNames('btnTiny text-[14px] font-semibold cursor-pointer flex items-center justify-center lg:min-w-[165px] label-text flex-1 lg:flex-0', option.value === currentTab && 'btnMain px-m-0', size === 'sm' && 'min-w-0 flex-1')}
            onClick={() => {
              setCurrentTab(option.value)
            }}
          >
            { option.label }
          </div>
        )) }
      </div>
  )
}

export default Tabs