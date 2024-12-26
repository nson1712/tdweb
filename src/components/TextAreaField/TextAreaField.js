import React from "react"
import classNames from "classnames"
import renderField from "../Form/renderField"
import classes from "./TextAreaField.module.scss"

export class TextAreaField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      focus: false,
      currentType: props.type,
    }
  }

  moveUpPlaceholder = () => {
    this.setState({
      focus: true,
    })
    const { input } = this.props
    if (input && input.onFocus) {
      input.onFocus()
    }
  }

  moveDownPlaceholder = () => {
    this.setState({
      focus: false,
    })
    const { input } = this.props
    if (input && input.onBlur) {
      input.onBlur()
    }
  }

  render() {
    const {
      input,
      placeholder,
      name,
      disabled,
      options,
      customClass,
      label,
      note,
      maxLength,
      rows,
      hasError,
    } = this.props
    const { focus, currentType } = this.state
    let remainCharactor = 0
    if (maxLength) {
      remainCharactor = maxLength - (input.value ? input.value.length : 0)
    }
    return (
      <div className="textAreaField">
        <div className={classes.inputContainer}>
          <textarea
            {...options}
            {...input}
            onChange={(e) => {
              input.onChange(e.target.value)
            }}
            label={placeholder || label}
            name={name}
            className={classNames(
              classes.input,
              customClass,
              hasError && classes.errorField,
              focus && classes.focus
            )}
            type={currentType}
            disabled={disabled}
            onFocus={this.moveUpPlaceholder}
            onBlur={this.moveDownPlaceholder}
            maxLength={maxLength}
            rows={rows}
            placeholder={placeholder}
          />
          {maxLength > 0 && (
            <p className={classes.remainCharactor}>{remainCharactor}</p>
          )}
        </div>
      </div>
    )
  }
}

export default renderField(TextAreaField)
