import { CHANGEBUTTONSTATE } from '../../config/const'


export const setButtonState = buttonID => {
  return { type: CHANGEBUTTONSTATE, data: buttonID }
}