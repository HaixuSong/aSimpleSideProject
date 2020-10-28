import { SETLOGINSTATUS } from '../../config/const'


let initState = false
export default function (preState = initState, action) {
  const { type, data } = action
  switch (type) {
    case SETLOGINSTATUS:
      let newState = data
      return newState
    default:
      return preState
  }
}