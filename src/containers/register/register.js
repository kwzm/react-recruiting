import React from 'react'
import Logo from '../../components/Logo'
import { List, InputItem, Radio, Button, WingBlank, WhiteSpace } from 'antd-mobile'

const RadioItem = Radio.RadioItem

class Register extends React.Component {
  constructor(props) {
    super(props)

    this.state = { 
      user: '',
      pwd: '',
      repeatpwd: '',
      type: 'genius'
    }
  }

  handleChange(key, value) {
    this.setState({
      [key]: value,
    })
  }

  handleRegister = () => {
    console.log(this.state)
  }

  render() {
    const { type } = this.state

    return (
      <div>
        <Logo />
        <WingBlank>
          <List>
            <InputItem
              onChange={(v) => this.handleChange('user', v)}
            >
              用户名
            </InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              onChange={(v) => this.handleChange('pwd', v)}
            >
              密码
            </InputItem>
            <WhiteSpace />
            <InputItem 
              type="password"
              onChange={(v) => this.handleChange('repeatpwd', v)}
            >
              确认密码
            </InputItem>
            <WhiteSpace />
            <RadioItem 
              checked={type === 'genius'}
              onChange={(v) => this.handleChange('type', 'genius')}
            >
              牛人
            </RadioItem>
            <RadioItem 
              checked={type === 'boss'}
              onChange={(v) => this.handleChange('type', 'boss')}
            >
              BOSS
            </RadioItem>
            <WhiteSpace />
            <Button 
              type="primary"
              onClick={this.handleRegister}
            >
              注册
            </Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default Register