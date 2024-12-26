import React, { Component } from 'react'
import classNames from 'classnames'
import { renderField } from '../Form'
import classes from './MultiCheckboxField.module.scss'

class MultiCheckboxField extends Component {
  handleClickOption = (option) => () => {
    const { input } = this.props
    const { onChange, value = [] } = input
    if (value && value.indexOf(option.value) !== -1) {
      onChange(value.filter((item) => item !== option.value))
    } else {
      onChange([...value, option.value])
    }
  }

  render() {
    const { input, options, direction, cols = 1 } = this.props
    return (
      <div className={classes.container}>
        <div
          className={classNames(
            classes.options,
            direction === 'column' && classes.col,
          )}
        >
          {options &&
            options.map((option) => (
              <div
                className={classes.option}
                key={option.value}
                onClick={this.handleClickOption(option)}
              >
                <div className={classNames(classes.checkboxWrapper)}>
                  <img
                    src={
                      input.value.indexOf(option.value) !== -1 ? '/images/icon-checkbox-checked.svg' : '/images/icon-checkbox-unchecked.svg'
                    }
                    className={classNames(
                      classes.checked,
                      input.value.indexOf(option.value) === -1 && classes.check,
                    )}
                    alt='check'
                  />
                </div>

                <span className={classes.label}>{option.label}</span>
              </div>
            ))}
        </div>
      </div>
    )
  }
}

export default renderField(MultiCheckboxField)
