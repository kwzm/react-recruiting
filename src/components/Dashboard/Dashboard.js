import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import NavLink from '../NavLink'
import Boss from '../Boss'
import Genius from '../Genius'
import User from '../User'
import Msg from '../Msg'
import { getMsgList, recvMsg } from '../../redux/chat.redux'

@connect(
  state => state,
  {getMsgList, recvMsg}
)
class Dashboard extends React.Component {
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }

  render() {
    const { user, location: { pathname } } = this.props
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'Boss列表',
        component: Genius,
        hide: user.type === 'boss'
      }, 
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      }, 
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    return (
      <div>
        <NavBar className="fixed-header" mode="dark">{navList.find(v => v.path === pathname).title}</NavBar>
        <div style={{ marginTop: 45 }}>
          <Switch>
            {navList.map(v=>(
              <Route key={v.path} path={v.path} component={v.component} />
            ))}
          </Switch>
        </div>
        <NavLink data={navList} />
      </div>
    )
  }
}

export default Dashboard