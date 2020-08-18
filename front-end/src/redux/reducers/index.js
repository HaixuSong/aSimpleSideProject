import { combineReducers } from 'redux'
import buttonReducer from './filter-button'

export default combineReducers({
  filter: buttonReducer
})