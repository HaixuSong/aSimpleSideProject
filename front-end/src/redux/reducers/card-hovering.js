import { MOUSEMOVEIN, MOUSEMOVEOUT } from '../../config/const'

let initState = {
  lat: 40.7451,
  lng: -74.0248
}
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
