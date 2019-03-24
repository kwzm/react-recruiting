const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')
const model = require('./model')
const Chat = model.getModel('chat')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

import React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { StaticRouter } from 'react-router-dom'
import csshook from 'css-modules-require-hook/preset'
import App from '../src/App'
import reducers from '../reducer'

io.on('connection', function(socket) {
  socket.on('sendmsg', function(data){
    console.log(data)
    // io.emit('recvmsg', data)
    const { from, to, msg } = data
    const chatid = [from,to].sort().join('_')

    Chat.create({chatid, from, to, content: msg}, function(err, doc){
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
  })
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.static(path.resolve('build')))
app.use('/user', userRouter)
app.use(function(req, res, next){
  if (req.url.startsWith('/user/')||req.url.startsWith('/static/')) {
    return next()
  }
  
  const store = createStore(reducers, compose(
    applyMiddleware(thunk)
  ))
  const context = {}
  const markUp = renderToNodeStream(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  )

  if (context.url) {
    res.redirect(301, context.url);
  } else {
    return res.sendFile(path.resolve('build/index.html'))
  }
})

server.listen(9093, () => {
  console.log('Node app start at port 9093')
})