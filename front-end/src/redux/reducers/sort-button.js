import { CHANGESORTSTATE } from '../../config/const'

let initState = 4
export default function (preState = initState, action) {
  const { type, data } = action
  switch (type) {
    case CHANGESORTSTATE:
      let newState = data
      return newState
    default:
      return preState
  }
}