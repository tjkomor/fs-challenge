export default function updateLikesCount(state, action) {
  let newState = state.map(beer => {
    if (beer.id === action.payload.id) {
      return Object.assign({}, beer, { likes: action.payload.likes })
    } else if (!beer.id) {
      return action.payload
    } else {
      return beer
    }
  })
  return [...newState]
}
