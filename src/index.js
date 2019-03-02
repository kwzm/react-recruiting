import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import AuthRoute from './components/AuthRoute'
import Login from './containers/login'
import Dashboard from './components/Dashboard'
import Register from './containers/register'
import BossInfo from './containers/bossinfo'
import GeniusInfo from './containers/geniusinfo'
import Chat from './components/Chat'
import reducers from './reducer'
import './config'
import './index.css'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunk)
))

ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <AuthRoute />
          <Switch>
            <Route path="/bossinfo" component={BossInfo} />
            <Route path="/geniusinfo" component={GeniusInfo} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/chat/:user" component={Chat} />
            <Route component={Dashboard} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  )
  , document.getElementById('root'))
