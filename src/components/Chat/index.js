import React from 'react'
import io from 'socket.io-client'
import { List, InputItem } from 'antd-mobile'

const socket = io('ws://localhost:9093')

class Chat extends React.Component {
  constructor(props) {
    super(props)

    this.state = { 
      text: '',
      msg: [] 
    }
  }

  componentDidMount() {
    socket.on('recvmsg', (data) =>{
      this.setState({ msg: [...this.state.msg, data.text]})
    })
  }

  handleChange = (v) => {
    this.setState({ text: v })
  }

  handleSubmit = () => {
    socket.emit('sendmsg', { text: this.state.text })
    this.setState({ text: '' })
  }

  render() {
    return (
      <div>
        {this.state.msg.map(v => {
          return <p key={v}>{v}</p>
        })}
        <div className="stick-footer">
          <List>
            <InputItem 
              placeholder="请输入"
              value={this.state.text}
              onChange={this.handleChange}
              extra={<span onClick={this.handleSubmit}>发送</span>}
            />
          </List>
        </div>
      </div>
      
    )
  }
}

export default Chat