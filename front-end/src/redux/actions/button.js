import { CHANGEFILTERSTATE } from '../../config/const'


export const setFilterState = data => {
  return { type: CHANGEFILTERSTATE, data: data }
}