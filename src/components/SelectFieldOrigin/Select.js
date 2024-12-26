import React from 'react'
import classNames from 'classnames'
import { renderField } from '../Form'
import classes from './Select.module.scss'

export const SelectComponent = ({
  input,
  options,
  customClass,
  placeholder,
  disabled
}) => (
  <div className={classes.container}>
    <select
      className={classNames(classes.input, customClass)}
      value={input.value}
      onChange={(e) => input.onChange(e.target.value)}
      disabled={disabled}
    >
      {placeholder && (
        <option value='' selected disabled hidden>
          {placeholder}
        </option>
      )}

      {options &&
        options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
    <img src={'/images/arrow-down.svg'} className={classes.caretIcon} alt='caret' />
  </div>
)

export default renderField(SelectComponent)
