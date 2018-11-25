import { combineReducers } from 'redux'
import todos from './redux/todos'
import counter from './redux/counter'

export default combineReducers({
  todos,
  counter,
})