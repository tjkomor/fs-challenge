export default function updateLikesCount(state, action) {
  let newState = state.map(beer => {
    console.log("BEER", beer)
    console.log("PAYLOAD", action.payload)
    if (beer.name === action.payload.name) {
      return Object.assign({}, action.payload, { likes: action.payload.likes })
    } else {
      return beer
    }
  })
  return [...newState]
}
