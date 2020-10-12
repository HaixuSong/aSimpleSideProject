import { SETALLDATA } from '../../config/const'

export const setAllData = data => {
  return { type: SETALLDATA, data: data }
}