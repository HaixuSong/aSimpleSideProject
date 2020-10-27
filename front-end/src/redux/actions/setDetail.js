import { SETDETAIL } from '../../config/const'

export const setDetail = data => {
  return { type: SETDETAIL, data: data }
}