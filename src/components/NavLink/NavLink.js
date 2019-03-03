import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { TabBar } from 'antd-mobile'

@withRouter
@connect(
  state => state.chat
)
class NavLink extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }

  render() {
    const { data, location: { pathname }, unread } = this.props
    const navList = data.filter(v => !v.hide)

    return (
      <TabBar>
        {navList.map(v => (
           <TabBar.Item
            key={v.path}
            title={v.text}
            badge={v.path === '/msg' ? unread : 0}
            icon={{uri: require(`./img/${v.icon}.png`)}}
            selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
            selected={pathname === v.path}
            onPress={() => this.props.history.push(v.path)}
           />
        ))}
      </TabBar>
    )
  }
} 

export default NavLink