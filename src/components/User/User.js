import React from 'react'
import { connect } from 'react-redux'

@connect(
  state => state.user
)
class User extends React.Component {
  render() {
    return (
      <div>
        <p>用户中心</p>
      </div>
    )
  }
}

export default User