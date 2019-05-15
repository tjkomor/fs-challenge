import { ADD_BEER, OPEN_COOLER, UPDATE_LIKES } from 'actions/types'
import updateLikesCount from 'helpers/updateLikesCount'

export default function(state = [], action) {
  switch(action.type) {
    // case ADD_BEER:
    //   return [action.payload, ...state]
    case OPEN_COOLER:
      const beers = action.payload.data.map(beer => beer)
      return [...state, ...beers]
    case UPDATE_LIKES:
      return updateLikesCount(state, action)
    default:
      return state
  }
}
