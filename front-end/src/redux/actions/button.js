import { CHANGEFILTERSTATE, SETLOGINSTATUS, CHANGESORTSTATE } from '../../config/const'


export const setFilterState = data => {
  return { type: CHANGEFILTERSTATE, data: data }
}
export const setLoginStatus = data => {
  return { type: SETLOGINSTATUS, data: data }
}
export const setSortState = data => {
  return { type: CHANGESORTSTATE, data: data }
}