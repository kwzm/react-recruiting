import React from 'react'

export default function imoocForm(Comp) {
  return class WrapperComp extends React.Component {
    constructor(props) {
      super(props)

      this.state = {}
    }

    handleChange = (key, value) => {
      this.setState({
        [key]: value,
      })
    }

    render() {
      return (
        <Comp 
          state={this.state} 
          handleChange={this.handleChange} 
          {...this.props} 
        />
      )
    }
  }
}