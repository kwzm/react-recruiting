import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import Logo from '../../components/Logo'
import { login } from '../../redux/user.redux'

@connect(
  state => state.user,
  { login }
)
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
    }
  }

  handleChange = (key, value) => {
    this.setState({
      [key]: value,
    })
  }

  handleLogin = () => {
    this.props.login(this.state)
  }

  register = () => {
    this.props.history.push('/register')
  }

  render() {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <WingBlank>
          <List>
            {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
            <InputItem onChange={(v) => this.handleChange('user', v)}>用户</InputItem>
            <WhiteSpace />
            <InputItem onChange={(v) => this.handleChange('pwd', v)}>密码</InputItem>
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