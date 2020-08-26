import { combineReducers } from 'redux'
import buttonReducer from './filter-button'
import loginReducer from './login-button'

export default combineReducers({
  filter: buttonReducer,
  login: loginReducer
})