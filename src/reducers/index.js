import { combineReducers } from 'redux'
import beersReducer from 'reducers/beers'

export default combineReducers({
  beers: beersReducer
})
