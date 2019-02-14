const mongoose = require('mongoose')

const DB_URL = 'mongodb://127.0.0.1:27017/imooc-chart'

mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => {
  console.log('mongodb connect success')
})

const models = {
  user: {
    user: { type: String, required: true },
    pwd: { type: String, required: true },
    type: { type: String, required: true },
    // 头像
    avatar: { type: String },
    // 个人简介或者职位简介
    desc: { type: String },
    // 职位名
    title: { type: String },
    // 如果你是boss还有两个字段
    company: { type: String },
    money: { type: String }
  },
  chart: {}
}

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name)
  }
}