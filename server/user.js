const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')

Router.get('/list', (req, res) => {
  User.find({}, function(err, doc) {
    return res.json(doc)
  })
})

Router.post('/register', function(req, res){
  
})

Router.get('/info', (req, res) => {
  res.json({ code: 1 })
})

module.exports = Router