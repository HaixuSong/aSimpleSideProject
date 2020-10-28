import { GETNEWHOUSESTATE } from '../../config/const'

export const getNewHouseState = () => {
  var request = new XMLHttpRequest()
  request.open('GET', '/my-info/get-house-status', false)
  request.send(null)
  let data
  if (request.status === 200) {
    data = JSON.parse(request.responseText)
  }
  console.log(data);
  return { type: GETNEWHOUSESTATE, data: data }
}