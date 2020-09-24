import { combineReducers } from 'redux'
import buttonReducer from './filter-button'
import sortReducer from './sort-button'
import loginReducer from './login-button'
import houseStatus from './house-status'

export default combineReducers({
  filter: buttonReducer,
  login: loginReducer,
  houseStatus: houseStatus,
  sort: sortReducer
})