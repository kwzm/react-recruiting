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
import reducers from './reducer'
import './config'
import './index.css'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
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
            <Route component={Dashboard} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  )
  , document.getElementById('root'))
