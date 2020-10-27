import { SETDETAIL } from '../../config/const'

let initState = {}
export default function (preState = initState, action) {
  const { type, data } = action
  switch (type) {
    case SETDETAIL:
      let newState = data
      return newState
    default:
      return preState
  }
}