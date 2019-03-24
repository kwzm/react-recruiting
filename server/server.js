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
import { renderToNodeStream, renderToString } from 'react-dom/server'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { StaticRouter } from 'react-router-dom'
import csshook from 'css-modules-require-hook/preset'
require('asset-require-hook')({
  extensions: ['png'],
  limit: 10000
})
import App from '../src/App'
import reducers from '../src/reducer'
import staticPath from '../build/asset-manifest.json'

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
  const desc = {
    '/login': '一个用react搭建的招聘APP',
    '/msg': 'React聊天消息列表',
    '/boss': 'Boss查看牛人列表页面'
  }
  const markUpStream = renderToNodeStream(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  )

  if (context.url) {
    res.redirect(301, context.url);
  } else {
    res.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <meta name="theme-color" content="#000000">
          <meta name="author" content="kwzm">
          <meta name="keywords" content="react,ssr,招聘APP">
          <meta name="description" content="${desc[req.url]}">
          <title>React App</title>
          <link rel="stylesheet" href="${staticPath['main.css']}"/>
        </head>
        <body>
          <noscript>
            You need to enable JavaScript to run this app.
          </noscript>
          <div id="root">
    `)
    markUpStream.pipe(res, {end: false})
    markUpStream.on('end', () => {
      res.write(`
          </div>
          <script src="${staticPath['main.js']}"></script>
          </body>
        </html>  
      `)
      res.end()
    })
  }
})

server.listen(9093, () => {
  console.log('Node app start at port 9093')
})