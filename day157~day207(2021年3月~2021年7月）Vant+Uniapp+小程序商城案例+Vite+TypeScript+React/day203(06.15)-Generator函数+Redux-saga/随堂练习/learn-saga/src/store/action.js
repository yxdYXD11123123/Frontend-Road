import { ADD_COUNT } from "./constants"

export const addCount = (newCount) => {
  return {
    type: ADD_COUNT,
    newCount
  }
}