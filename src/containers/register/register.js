import React from 'react'
import Logo from '../../components/Logo'
import { List, InputItem, Radio, Button, WingBlank, WhiteSpace } from 'antd-mobile'

const RadioItem = Radio.RadioItem

class Register extends React.Component {
  constructor(props) {
    super(props)

    this.state = { type: 'genius'}
  }

  render() {
    const { type } = this.state

    return (
      <div>
        <Logo />
        <h2>注册页面</h2>
        <WingBlank>
          <List>
            <InputItem>用户名</InputItem>
            <WhiteSpace />
            <InputItem>密码</InputItem>
            <WhiteSpace />
            <InputItem>确认密码</InputItem>
            <WhiteSpace />
            <RadioItem checked={type === 'genius'}>
              牛人
            </RadioItem>
            <RadioItem checked={type === 'boss'}>
              BOSS
            </RadioItem>
            <WhiteSpace />
            <Button type="primary">注册</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default Register