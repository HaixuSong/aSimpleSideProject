import { CHANGEFILTERSTATE, SETLOGINSTATUS } from '../../config/const'


export const setFilterState = data => {
  return { type: CHANGEFILTERSTATE, data: data }
}
export const setLoginStatus = data => {
  return { type: SETLOGINSTATUS, data: data }
}