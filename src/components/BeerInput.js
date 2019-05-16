import React from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions'
import Cooler from 'components/Cooler'

class BeerInput extends React.Component {
  state = {beer: ''}

  handleChange = event => {
    this.setState({ beer: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.addBeer(this.state.beer)
    this.setState({ beer: '' })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Add a Beer!</h2>
          <textarea onChange={this.handleChange} value={this.state.beer} />
          <div>
            <button onClick={this.props.didUpdate} className="add-beer-to-cooler-btn">Add beer to cooler!</button>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(null, actions)(BeerInput)
