import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthRoute from './components/AuthRoute'
import Login from './containers/login'
import Dashboard from './components/Dashboard'
import Register from './containers/register'
import BossInfo from './containers/bossinfo'
import GeniusInfo from './containers/geniusinfo'
import Chat from './components/Chat'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.log(error, info)
  }

  render() {
    const { hasError } = this.state

    return hasError ? (
      <h2 style={{textAlign: 'center'}}>页面出错了</h2>
    ) : (
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
}

export default App