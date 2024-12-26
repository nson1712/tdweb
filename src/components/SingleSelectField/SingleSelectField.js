import React from 'react'
import { renderField } from '../Form'
import classNames from 'classnames'

const SingleSelectField = ({input, options, disabled}) => {
  return (
    <div className={'mt-[8px] flex items-center flex-wrap'}>
      {options.map((option) => (
        <div key={option.value}
          className={classNames('flex items-center justify-center h-[32px] px-[16px] rounded-[16px] bg-gray-4 text-[12px] font-semibold text-white cursor-pointer mr-[16px] mb-[10px] lg:mb-0', input.value === option.value && 'bg-main-3 primary-text', disabled && 'pointer-events-none')}
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

export default renderField(SingleSelectField)
