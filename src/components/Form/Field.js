import React, { Component } from 'react'

const addAllProps = (MyComponent) => (props) => (
  <MyComponent {...props} />
)

export default class Field extends Component {
  component = addAllProps(this.props.component)


  handleChangeValue = (e) => {
    const { name, updateProperty, onChange } = this.props
    const value = e?.target?.value || e
    updateProperty(name, value)
    if (onChange) {
      onChange(value)
    }
  }

  handleBlur = () => {
    const { handleTouched, name } = this.props
    if (handleTouched) {
      handleTouched(name)
    }
   
  }

  render() {
    const { component, value, ...rest } = this.props
    let inputValue = (value && value.value)
    if (inputValue === null || typeof inputValue === 'undefined') {
      inputValue = ''
    }
    const meta = (value && value.meta) || {}
    return (
      <div >
        { <this.component {...rest}
            meta={meta}
            input={{
              value: inputValue,
              onChange: this.handleChangeValue,
              onBlur: this.handleBlur
            }}
          />
        }
      </div>
    )
  }
}
