import { GETNEWHOUSESTATE } from '../../config/const'

let initState = {
  email: "",
  pictures: []
}
export default function (preState = initState, action) {
  const { type, data } = action
  switch (type) {
    case GETNEWHOUSESTATE:
      let newState = data
      return newState
    default:
      return preState
  }
}