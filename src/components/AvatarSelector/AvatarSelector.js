import React from 'react'
import PropTypes from 'prop-types'
import { Grid, List } from 'antd-mobile'

class AvatarSelector extends React.Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {}
  }

  handleClick = (el) => {
    this.setState(el)
    this.props.selectAvatar(el.text)
  }

  render() {
    const avatarNames = ['boy','girl','man','woman','bull','chick','crab','hedgehog','hippopotamus','koala','lemur','pig','tiger','whale','zebra']
    const avatarList = avatarNames.map((name) => {
      return {
        icon: require(`../img/${name}.png`),
        text: name
      }
    })
    const gridHeader = this.state.icon 
      ? (
          <div>
            <span>已选择的头像</span>
            <img style={{ width: 20 }} src={this.state.icon} alt={this.state.text} />
          </div>
        ) 
      : '请选择头像'

    return (
      <List renderHeader={() => gridHeader}>
        <Grid 
          data={avatarList} 
          columnNum={5} 
          onClick={this.handleClick}
        />
      </List>
    )
  }
}

export default AvatarSelector