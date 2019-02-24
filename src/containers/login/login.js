import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import Logo from '../../components/Logo'
import { login } from '../../redux/user.redux'
import imoocFrom from '../../components/imooc-form'

@connect(
  state => state.user,
  { login }
)
@imoocFrom
class Login extends React.Component {
  handleLogin = () => {
    this.props.login(this.props.state)
  }

  register = () => {
    this.props.history.push('/register')
  }

  render() {
    return (
      <div>
        {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <WingBlank>
          <List>
            {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
            <InputItem onChange={(v) => this.props.handleChange('user', v)}>用户</InputItem>
            <WhiteSpace />
            <InputItem 
              type="password" 
              onChange={(v) => this.props.handleChange('pwd', v)}
            >
              密码
            </InputItem>
          </List>
          <WhiteSpace />
          <Button onClick={this.handleLogin} type="primary">登录</Button>
          <WhiteSpace />
          <Button type="primary" onClick={this.register}>注册</Button>
        </WingBlank>
      </div>  
    )
  }
}

export default Login