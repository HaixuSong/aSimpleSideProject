import { MOUSEMOVEIN, MOUSEMOVEOUT } from '../../config/const'

let initState = null
export default function (preState = initState, action) {
  const { type, data } = action
  switch (type) {
    case MOUSEMOVEIN:
      let newState = data
      return newState
    case MOUSEMOVEOUT:
      return initState
    default:
      return preState
  }
}
