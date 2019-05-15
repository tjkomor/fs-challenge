import React from 'react'

const Beer = props => (
  <div>
    <li key={props.beer.id} className="beer">
      {props.beer.name}
      <br></br>
      Likes: {props.beer.likes}
      <button className="like" onClick={() => props.increaseLikes(props.beer)}>Like</button>
      <button className="dislike" onClick={() => props.decreaseLikes(props.beer)}>Dislike</button>
    </li>
  </div>
)

export default Beer
