import axios from 'axios'

import { fsBeer, localProxy } from 'endpoints'
import { ADD_BEER,
         OPEN_COOLER,
         UPDATE_LIKES}
 from 'actions/types'

export function addBeer(beer) {
  const req = { name: beer, likes: 0 }
  const response = axios.post(localProxy + fsBeer, req)
  .then(response => {
    if (response.status === 204) {
      return req
    } else if (response.status === 200) {
      return response
    }
  })
  .catch(error => {
    return new Error(error)
  })

  return {
    type: ADD_BEER,
    payload: req
  }
}

export function updateLikes(beer, typeOfLike) {
  let numberOfLikes

  if (typeOfLike === 'increase') {
    numberOfLikes = beer.likes + 1
  } else if (typeOfLike === 'decrease') {
    numberOfLikes = beer.likes - 1
  }

  const response = axios.put(
    localProxy + fsBeer + beer.id,
    {likes: numberOfLikes}
  ).then(response => {
    if (response.status === 204) {
      return {id: beer.id, name: beer.name, likes: numberOfLikes}
    } else if (response.status === 200) {
      return response
    }
  })
  .catch(error => {
    return new Error(error)
  })

  return {
    type: UPDATE_LIKES,
    payload: response
  }
}

export async function openCooler() {
  console.log("OPEN COOLER CALLED")
  const response = axios.get(localProxy + fsBeer)
  .then(response => {
    return response
  })
  .catch(error => {
    return new Error(error)
  })

  return {
    type: OPEN_COOLER,
    payload: response
  }
}
