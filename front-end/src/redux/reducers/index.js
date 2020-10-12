import { combineReducers } from 'redux'
import buttonReducer from './filter-button'
import sortReducer from './sort-button'
import loginReducer from './login-button'
import houseStatus from './house-status'
import allData from './allData'
import cardGeo from './card-hovering'

export default combineReducers({
  filter: buttonReducer,
  login: loginReducer,
  houseStatus: houseStatus,
  cardGeo: cardGeo,
  sort: sortReducer,
  allData: allData
})