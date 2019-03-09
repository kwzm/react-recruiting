import React from 'react'
import { connect } from 'react-redux'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { sendMsg, getMsgList, recvMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'

@connect(
  state => state,
  { sendMsg, getMsgList, recvMsg, readMsg }
)
class Chat extends React.Component {
  constructor(props) {
    super(props)

    this.state = { 
      text: '',
      msg: [],
      showEmoji: false 
    }
  }

  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
    this.fixCarousel()
  }

  componentWillUnmount() {
    const to = this.props.match.params.user

    this.props.readMsg(to)
  }

  fixCarousel() {
    setTimeout(function(){
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }

  handleChange = (v) => {
    this.setState({ text: v })
  }

  handleSubmit = () => {
    // socket.emit('sendmsg', { text: this.state.text })
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    
    this.props.sendMsg({from, to, msg})
    this.setState({ text: '' })
  }

  render() {
    const userid = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users
    const chatid = getChatId(userid, this.props.user._id)
    const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid)
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
										.split(' ')
										.filter(v=>v)
                    .map(v=>({text:v}))
                    
    if (!users[userid]) {
      return null
    }

    return (
      <div id="chat-page">
        <NavBar 
          mode="dark"
          leftContent={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          {users[userid].name}
        </NavBar>             
        {chatmsgs.map(v => {
          const avatar = require(`../img/${users[v.from].avatar}.png`)

          return v.from == userid ? (
            <List key={v._id}>
              <Item thumb={avatar}>{v.content}</Item> 
            </List>
          ) : (
            <List key={v._id}>
              <Item 
                className="chat-me"
                extra={<img src={avatar} />}
              >
                {v.content}
              </Item> 
            </List>
          )
        })}
        <div className="stick-footer">
          <List>
            <InputItem 
              placeholder="请输入"
              value={this.state.text}
              onChange={this.handleChange}
              extra={
                <div>
                  <span 
                    style={{marginRight: 15}} 
                    onClick={() => {
                      this.setState({showEmoji: !this.state.showEmoji})
                      this.fixCarousel()
                    }}>
                    😃
                  </span>
                  <span onClick={this.handleSubmit}>发送</span>
                </div>
              }
            />
          </List>
          {this.state.showEmoji ? <Grid
            data={emoji}
            columnNum={9}
            carouselMaxRow={4}
            isCarousel
            onClick={el => {
              this.setState({
                text: this.state.text + el.text
              })
            }}
          /> : null}
        </div>
      </div>
      
    )
  }
}

export default Chat