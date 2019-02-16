import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../components/AvatarSelector'

class BossInfo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      avatar: '',
      title: '',
      company: '',
      money: '',
      desc: ''
    }
  }

  onChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  render() {
    return (
      <div>
        <NavBar mode="dark">BOSS完善信息页</NavBar>
        <AvatarSelector selectAvatar={(v) => this.onChange('avatar', v)} />
        <InputItem onChange={(v) => this.onChange('title', v)}>招聘职位</InputItem>
        <InputItem onChange={(v) => this.onChange('company', v)}>公司名称</InputItem>
        <InputItem onChange={(v) => this.onChange('money', v)}>职位薪资</InputItem>
        <TextareaItem 
          title="职位要求" 
          rows={3}
          autoHeight
          onChange={(v) => this.onChange('desc', v)} 
        />
        <Button type="primary">保存</Button>
      </div>
    )
  }
}

export default BossInfo