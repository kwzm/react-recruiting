import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import AuthRoute from './components/AuthRoute'
import Login from './containers/login'
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

const Boss = () => <h2>Boss</h2>

ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <AuthRoute />
          <Switch>
            <Route path="/bossinfo" component={BossInfo} />
            <Route path="/geniusinfo" component={GeniusInfo} />
            <Route path="/boss" component={Boss} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  )
  , document.getElementById('root'))
