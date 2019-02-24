import React from 'react'
import { connect } from 'react-redux'
import browserCookie from 'browser-cookies'
import { Redirect } from 'react-router-dom'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import { logoutSubmit } from '../../redux/user.redux'

const Item = List.Item
const Brief = Item.Brief

@connect(
  state => state.user,
  {logoutSubmit}
)
class User extends React.Component {
  logout = () => {
    const alert = Modal.alert

    alert('注销', '确认退出登录吗？', [
      { text: '取消' },
      { text: '确定', onPress: () => {
        browserCookie.erase('userid')
        this.props.logoutSubmit()
      }}
    ])
  }

  render() {
    const { user, redirectTo, avatar, type, company, title, desc, money } = this.props

    return (
      user ? (
        <div>
          <Result
            img={<img style={{width: 50}} src={require(`../img/${avatar}.png`)} alt="" />}
            title={user}
            message={type === 'boss' ? company : null}
          />
          <List renderHeader={() => '简介'}>
            <Item multipleLine>
              {title}
              {desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
              {money ? <Brief>{money}</Brief> : null}
            </Item>
          </List>
          <WhiteSpace />
          <List>
            <Item onClick={this.logout}>退出登录</Item>
          </List>
        </div>
      ) : <Redirect to={redirectTo} />
    )
  }
}

export default User