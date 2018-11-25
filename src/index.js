import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import AuthRoute from './components/AuthRoute'
import Login from './containers/login'
import Register from './containers/register'
import reducers from './reducer'
import './config'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <AuthRoute />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>
      </BrowserRouter>
    </Provider>
  )
  , document.getElementById('root'))
