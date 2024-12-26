import React from 'react'
import classNames from 'classnames'
import Select from 'react-select'
import renderField from '../Form/renderField'
import classes from './SelectField.module.scss'

const Icon = ({ selectProps }) => (
  <img
    src={'/images/arrow-down.svg'}
    className={classNames(
      classes.icon,
      selectProps.menuIsOpen && classes.iconUp,
    )}
    alt='icon'
  />
)

const components = {
  DropdownIndicator: Icon,
}

export class SelectField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      focus: false,
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

  handleChange = (selectOption) => {
    const { input, onChange } = this.props
    input.onChange(selectOption)
    if (onChange) {
      onChange(selectOption)
    }
  }

  render() {
    const {
      input,
      placeholder,
      name,
      type,
      disabled,
      options,
      customClass,
      fullBorder,
      loading,
      hasError,
      intl,
      h50,
      bb1,
      isClearable,
      valueContainerStyles = {},
      searchable = true,
    } = this.props
    const { focus } = this.state
    let placeholderStr = ''
    if (placeholder) {
      if (typeof placeholder === 'string') {
        placeholderStr = placeholder
      } else {
        placeholderStr = intl.formatMessage(placeholder)
      }
    }
    return (
      <div className={classes.inputContainer}>
        <Select
          onChange={this.handleChange}
          value={input.value || null}
          name={name}
          instanceId={name}
          // menuIsOpen
          className={classNames(
            classes.input,
            fullBorder && classes.fullBorder,
            customClass,
            focus && classes.focus,
            'selectField',
            hasError && classes.errorField,
            h50 && classes.h50,
            bb1 && classes.bb1,
          )}
          isClearable={isClearable}
          type={type}
          isDisabled={disabled}
          onFocus={this.moveUpPlaceholder}
          onBlur={this.moveDownPlaceholder}
          options={options}
          isLoading={loading}
          placeholder={placeholderStr}
          components={components}
          isSearchable={searchable}
          styles={{
            control: () => ({
              border: 0,
              padding: 0,
              margin: '3px 0 0 0px',
            }),
            option: (styles) => ({
              ...styles,
              backgroundColor: 'transparent !important',
              color: '#ffffff !important',
              '&:hover': {
                backgroundColor: 'rgba(255, 180, 43, 0.3) !important',
              },
            }),
            indicatorsContainer: () => ({
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              right: h50 ? 15 : 8,
              display: 'flex',
              alignItems: 'center',
            }),
            indicatorSeparator: () => ({}),
            loadingIndicator: () => ({
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              right: '25px',
              width: '45px',
              fontSize: '6px',
              color: '#ffffff',
            }),
            valueContainer: (styles) => ({
              ...styles,
              padding: '2px 0 2px 0',
              ...valueContainerStyles,
            }),
            singleValue: (styles) => ({
              ...styles,
              paddingRight: isClearable ? 60 : 'unset',
              color: '#ffffff',
            }),
            menu: (styles) => ({
              ...styles,
            }),
            menuList: (styles) => ({
              ...styles,
              backgroundColor: '#262A30',
              '&::-webkit-scrollbar': {
                width: '10px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgb(135, 141, 150)',
                backgroundClip: 'padding-box',
                border: '3px solid transparent',
                borderRadius: '15px',
              },
              '&::-webkit-scrollbar-track-piece': {
                backgroundColor: 'transparent',
                backgroundClip: 'padding-box',
                border: '3px solid transparent',
                borderRadius: '15px',
              },
            }),
            input: (styles) => ({
              ...styles,
              color: '#959DA1',
              fontWeight: 'normal',
              input: {
                color: '#ffffff !important',
              },
            }),
          }}
        />
      </div>
    )
  }
}

export default renderField(SelectField)
