import React, { Component } from 'react'
import classNames from 'classnames'
import { renderField } from '../Form'
import classes from './SwitchField.module.scss'

export class SwitchField extends Component {
  handleChange =
    ({ active }) =>
    (e) => {
      e.stopPropagation()
      const { input } = this.props
      input.onChange(active)
    }

  render() {
    const { input, text, size, disabled } = this.props

    return (
      <div
        className={classNames(
          classes.wrapper,
          size === 'md' && classes.md,
          disabled && classes.disabled,
        )}
      >
        {input.value ? (
          <span onClick={this.handleChange({ active: false })}>
            <span
              className={classNames(
                classes.active,
                classes.switch,
                !text && classes.switchEmpty,
              )}
            />{' '}
            <span className='text-[16px] leading-[24px] label-text ml-[8px]'>
              On
            </span>
            
          </span>
        ) : (
          <span onClick={this.handleChange({ active: true })}>
            <span
              className={classNames(
                classes.inActive,
                classes.switch,
                !text && classes.switchEmpty,
              )}
            />{' '}
            <span className='text-[16px] leading-[24px] label-text ml-[8px]'>
              Off
            </span>
          </span>
        )}
      </div>
    )
  }
}

export default renderField(SwitchField)
