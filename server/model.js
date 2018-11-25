const mongoose = require('mongoose')

const DB_URL = 'mongodb://127.0.0.1:27017/react-recruiting'

mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => {
  console.log('mongodb connect success')
})