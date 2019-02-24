import React from 'react'
import { Redirect } from 'react-router-dom'
import { List, InputItem, Radio, Button, WingBlank, WhiteSpace } from 'antd-mobile'
import { connect } from 'react-redux'
import Logo from '../../components/Logo'
import { register } from '../../redux/user.redux'
import imoocForm from '../../components/imooc-form'

const RadioItem = Radio.RadioItem

@connect(
  (state) => state.user,
  { register },
)
@imoocForm
class Register extends React.Component {
  componentDidMount() {
    this.props.handleChange('type', 'genius')
  }
  
  handleRegister = () => {
    this.props.register(this.props.state)
  }

  render() {
    const { type } = this.props.state

    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <WingBlank>
          <List>
            {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
            <InputItem
              onChange={(v) => this.props.handleChange('user', v)}
            >
              用户名
            </InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              onChange={(v) => this.props.handleChange('pwd', v)}
            >
              密码
            </InputItem>
            <WhiteSpace />
            <InputItem 
              type="password"
              onChange={(v) => this.props.handleChange('repeatpwd', v)}
            >
              确认密码
            </InputItem>
            <WhiteSpace />
            <RadioItem 
              checked={type === 'genius'}
              onChange={(v) => this.props.handleChange('type', 'genius')}
            >
              牛人
            </RadioItem>
            <RadioItem 
              checked={type === 'boss'}
              onChange={(v) => this.props.handleChange('type', 'boss')}
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