import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace } from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

@connect(
  state => state.user
)
class User extends React.Component {
  render() {
    const { user, avatar, type, company, title, desc, money } = this.props

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
            <Item>推出登录</Item>
          </List>
        </div>
      ) : null
    )
  }
}

export default User