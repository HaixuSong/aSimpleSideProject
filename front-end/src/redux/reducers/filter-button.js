import { CHANGEFILTERSTATE } from '../../config/const'

let initState = {
  "price": "price",
  "distance to Stevens": "distance to Stevens",
  "bedrooms": "bedrooms",
  "room type": "room type"
}
export default function (preState = initState, action) {
  const { type, data } = action
  switch (type) {
    case CHANGEFILTERSTATE:
      let newState = { ...preState }
      if (data.choice === "Reset Default") {
        newState[data.name] = data.name
      } else { newState[data.name] = data.choice }
      return newState
    default:
      return preState
  }
}