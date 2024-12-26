import React from 'react'
import { renderField } from '../Form'
import classNames from 'classnames'

const TabField = ({input, options, disabled}) => {
  return (
    <div className={'mt-[8px] flex items-center'}>
      {options.map((option) => (
        <div key={option.value}
          className={classNames('flex items-center justify-center flex-1 h-[48px] px-[20px] rounded-[4px] bg-main text-[16px] font-semibold text-white cursor-pointer mr-[16px] border-[1px] border-transparent', input.value === option.value && 'border-primary primary-text', disabled && 'pointer-events-none')}
          onClick={() => {
            input.onChange(option.value)
          }}
        >
          {option.label}
        </div>
      ))}
    </div>
  )
}

export default renderField(TabField)
