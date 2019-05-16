export default function updateLikesCount(state, action) {
  let newState = state.map(beer => {
    if (beer.name === action.payload.name) {
      return Object.assign({}, action.payload, { likes: action.payload.likes })
    } else {
      return beer
    }
  })
  return [...newState]
}
