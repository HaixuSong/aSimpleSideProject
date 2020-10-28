import { MOUSEMOVEIN, MOUSEMOVEOUT } from '../../config/const'

export const cardMoveIn = data => {
  return { type: MOUSEMOVEIN, data: data }
}

export const cardMoveOut = data => {
  return { type: MOUSEMOVEOUT, data: data }
}