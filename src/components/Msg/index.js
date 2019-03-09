import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

@connect(
  state => state
)
class Msg extends React.Component {
  getLast(arr) {
    return arr[arr.length - 1]
  }

  render() {
    const Item = List.Item
    const Brief = Item.Brief
    const userId = this.props.user._id
    const userInfo = this.props.chat.users
    const msgGroup = {}

    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    const chartList = Object.values(msgGroup)
    return (
      <div>
        {chartList.map(v => {
          const lastItem = this.getLast(v)
          const targetId = v[0].from === userId ? v[0].to : v[0].from
          const unreadNum = v.filter(v => !v.read && v.to === userId).length

          if (!userInfo[targetId]) {
            return null
          }

          return (
            <List>
              <Item 
                key={lastItem._id}
                thumb={require(`../img/${userInfo[targetId].avatar}.png`)}
                extra={<Badge text={unreadNum} />}
              >
                {lastItem.content}
                <Brief>{userInfo[targetId].name}</Brief>
              </Item>  
            </List>
          )
        })}
      </div>
    )
  }
}

export default Msg