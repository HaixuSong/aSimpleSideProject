import { MOUSEMOVEIN, MOUSEMOVEOUT } from '../../config/const'

export const cardMoveIn = data => {
  console.log({ type: MOUSEMOVEIN, data: data });
  return { type: MOUSEMOVEIN, data: data }
}

export const cardMoveOut = data => {
  console.log({ type: MOUSEMOVEOUT, data: data });
  return { type: MOUSEMOVEOUT, data: data }
}