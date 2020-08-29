import { combineReducers } from 'redux'
import buttonReducer from './filter-button'
import loginReducer from './login-button'
import houseStatus from './house-status'

export default combineReducers({
  filter: buttonReducer,
  login: loginReducer,
  houseStatus: houseStatus
})