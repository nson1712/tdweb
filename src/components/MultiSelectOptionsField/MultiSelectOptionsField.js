import React from 'react'
import Select, { components } from 'react-select'
import classNames from 'classnames'
import { renderField } from '../Form'
// import PerfectScrollbar from 'react-perfect-scrollbar'
import classes from './MultiSelectOptionsField.module.scss'

const Icon = ({ selectProps }) => (
  <i
    className={classNames(selectProps.menuIsOpen ? 'fas fa-caret-up' : 'fas fa-caret-down', classes.icon)}
  />
)

// const MenuList = (props) => {
//   const { children } = props
//   return (
//     <div style={{ height: children.length >= 7 ? 250 : 'unset' }}>
//       <div className={classes.scroll}>{children}</div>
//     </div>
//   )
// }

const Option = (props) => {
  const { isSelected, label } = props
  return (
    <div className={classes.filterGroup}>
      <components.Option {...props}>
        <div className={classes.filterOption}>
          <input
            type='checkbox'
            checked={isSelected}
            onChange={() => null}
            className={classes.checkbox}
          />
          <span className={classes.checkboxCustom}>
            <i className={classNames('fas fa-check', classes.checkIcon)} />
          </span>
          <label className={classes.label}> {label} </label>
        </div>
      </components.Option>
    </div>
  )
}

const COMPONENTS = { Option, DropdownIndicator: Icon }

class MultiSelectOptionsField extends React.Component {
  onChange = (value) => {
    const { input } = this.props
    input.onChange(value)
  }

  render() {
    const { options, input, placeholder, name, h50 } = this.props
    return (
      <Select
        // menuIsOpen
        // controlShouldRenderValue={false}
        className={classNames(classes.input, 'selectField', h50 && classes.h50)}
        onChange={this.onChange}
        components={COMPONENTS}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        options={options}
        isMulti
        placeholder={placeholder}
        value={input.value}
        instanceId={name}
        styles={{
          control: () => ({
            border: 0,
            padding: 0,
            margin: h50 ? '6px 0 0 0' : '2px 0 0 0px',
          }),
          option: (styles) => ({
            ...styles,
            backgroundColor: '#1d1d1d !important;',
            '&:hover': {
              backgroundColor: 'rgb(52, 58, 63) !important',
            },
          }),
          indicatorsContainer: () => ({
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            right: 8,
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
          menu: (styles) => ({
            ...styles,
            backgroundColor: '#1d1d1d',
          }),
          valueContainer: (styles) => ({
            ...styles,
            flexWrap: 'nowrap',
            marginRight: '50px',
            padding: 0
          }),
          multiValue: (styles) => ({
            ...styles,
            backgroundColor: '#343a3f',
            '&>div': {
              color: '#ffffff !important',
            },
          }),
          menuList: (styles) => ({
            ...styles,
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
            input: {
              color: '#ffffff !important',
            },
          }),
        }}
      />
    )
  }
}

export default renderField(MultiSelectOptionsField)
