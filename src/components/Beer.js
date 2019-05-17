import React from 'react'
import Button from '@material-ui/core/Button';

const Beer = props => (
  <div>
    <li key={props.beer.id} className="beer">
      {props.beer.name}
      <br></br>
      Likes: {props.beer.likes}
      <div className="like-div">
        <Button
          variant="contained"
          color="primary"
          className="like-btn"
          onClick={() => props.increaseLikes(props.beer)}>
          Like!
        </Button>
      </div>
      <div>
        <Button
          variant="contained"
          color="secondary"
          className="dislike-btn"
          onClick={() => props.decreaseLikes(props.beer)}>
          Dislike!
        </Button>
      </div>
    </li>
  </div>
)

export default Beer
