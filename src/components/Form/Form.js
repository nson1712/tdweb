import React, { Component } from 'react'


export default class Form extends Component {
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit()
   
  }

  render() {
    const { children, className } = this.props
    return (
      <form onSubmit={this.handleSubmit} className={className}>
        { children }
      </form>
    )
  }
}
