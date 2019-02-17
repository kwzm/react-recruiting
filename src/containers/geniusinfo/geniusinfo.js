import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../components/AvatarSelector'
import { update } from '../../redux/user.redux'

@connect(
  state => state.user,
  { update }
)
class GeniusInfo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      avatar: '',
      title: '',
      desc: ''
    }
  }

  onChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  handleSave = () => {
    this.props.update(this.state)
  }

  render() {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo

    return (
      <div>
         {redirect && path !== redirect ? <Redirect to={this.props.redirectTo} /> : null}
        <NavBar mode="dark">牛人完善信息页</NavBar>
        <AvatarSelector selectAvatar={(v) => this.onChange('avatar', v)} />
        <InputItem onChange={(v) => this.onChange('title', v)}>求职岗位</InputItem>
        <TextareaItem 
          title="个人简介" 
          rows={3}
          autoHeight
          onChange={(v) => this.onChange('desc', v)} 
        />
        <Button 
          type="primary"
          onClick={this.handleSave}
        >
          保存
        </Button>
      </div>
    )
  }
}

export default GeniusInfo