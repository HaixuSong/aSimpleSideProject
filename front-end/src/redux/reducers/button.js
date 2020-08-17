import { CHANGEBUTTONSTATE } from '../../config/const'

let initState = {
  Price: false,
  Distance2Stevens: false,
  BedsNBaths: false,
  HomeType: false,
  RoomType: false,
  Toilet: false,
  Parking: false,
}
export default function (preState = initState, action) {
  const { type, data } = action
  let newState = {
    Price: false,
    Distance2Stevens: false,
    BedsNBaths: false,
    HomeType: false,
    RoomType: false,
    Toilet: false,
    Parking: false,
  }
  switch (type) {
    case CHANGEBUTTONSTATE:
      newState[data] = true
      return newState
    default:
      return preState
  }
}