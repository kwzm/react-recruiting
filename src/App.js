import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthRoute from './components/AuthRoute'
import Login from './containers/login'
import Dashboard from './components/Dashboard'
import Register from './containers/register'
import BossInfo from './containers/bossinfo'
import GeniusInfo from './containers/geniusinfo'
import Chat from './components/Chat'

const App = () => {
  return (
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
  )
}

export default App