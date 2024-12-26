import React from 'react'
import classNames from 'classnames'
import onClickOutside from 'react-onclickoutside'
import 'cleave.js/dist/addons/cleave-phone.vi'
import moment from 'moment'
import DateTime from 'react-datetime'
import {renderField} from '../Form'
import classes from './DatePickerField.module.scss'

class DatePickerFieldComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      focus: false,
      openDatePicker: false,
      date: props.viewDate || props.input.value,
    }
  }

  moveUpPlaceholder = () => {
    const { input } = this.props
    if (input && input.onFocus) {
      input.onFocus()
    }
    this.setState({
      focus: true,
      openDatePicker: true,
    })
  }

  moveDownPlaceholder = () => {
    const { input } = this.props
    if (input && input.onBlur) {
      input.onBlur()
    }
    this.setState({
      focus: false,
    })
  }

  handleCancel = () => {
    this.setState({
      openDatePicker: false,
    })
  }

  handleChangeDate = (date) => {
    const { input, timeFormat } = this.props
    if (timeFormat) {
      input.onChange(moment(date).format(`MM/DD/YYYY ${timeFormat}`))
    } else {
      input.onChange(moment(date).format('MM/DD/YYYY'))
      this.setState({
        openDatePicker: false,
      })
    }

    this.setState({
      // openDatePicker: false,
      date,
    })
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.setState({
        openDatePicker: false,
      })
    }
  }

  validation = (currentDate) => {
    const { minDate, maxDate } = this.props
    return (
      (!minDate || currentDate.isAfter(moment(minDate))) &&
      (!maxDate || currentDate.isBefore(moment(maxDate)))
    )
  }

  handleBlurDateTime = () => {
    this.setState({
      openDatePicker: false,
    })
  }

  handleClickOutside = () => {
    this.setState({
      openDatePicker: false,
    })
  }

  render() {
    const {
      input,
      name,
      type,
      customClass,
      fullBorder,
      label,
      viewMode,
      viewDate,
      hasError,
      h50,
      disabled,
      timeFormat = false,
      placeholder,
    } = this.props
    const { focus, openDatePicker, date } = this.state

    // console.log('viewMode ===>', viewMode)

    return (
      <div className={classes.inputContainer}>
        <input
          label={label}
          onChange={input.onChange}
          value={input.value}
          name={name}
          className={classNames(
            classes.input,
            fullBorder && classes.fullBorder,
            customClass,
            hasError && classes.errorField,
            focus && classes.focus,
            h50 && classes.h50,
            disabled && classes.disabled,
          )}
          type={type}
          // disabled={openDatePicker}
          onFocus={this.moveUpPlaceholder}
          onBlur={this.moveDownPlaceholder}
          placeholder={placeholder || 'MM/DD/YYYY'}
          onKeyDown={this.handleKeyDown}
          readOnly
        />
        {input.value && (
          <a
            className={classes.btnClear}
            onClick={() => {
              input.onChange(null)
            }}
          >
            <img
              src={'/images/close.svg'}
              className={classes.closeIcon}
              alt='closeIcon'
            />
          </a>
        )}

        <img src='/images/date-calendar.svg' className={classes.calendarIcon}/>

        {openDatePicker && (
          <div className={classes.dateTimePicker}>
            <DateTime
              timeFormat={timeFormat}
              open={openDatePicker}
              input={false}
              value={date}
              onChange={this.handleChangeDate}
              initialViewMode={viewMode || 'days'}
              viewDate={date || viewDate}
              locale='en'
              isValidDate={this.validation}
              renderMonth={this.renderMonth}
              onBlur={this.handleBlurDateTime}
              disableCloseOnClickOutside={false}
            />
          </div>
        )}
      </div>
    )
  }
}

export const DatePickerField = onClickOutside(DatePickerFieldComponent)

export default renderField(DatePickerField)
