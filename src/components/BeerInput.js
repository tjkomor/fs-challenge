import React from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

class BeerInput extends React.Component {
  state = { beer: '' }

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
          <div className="beer-input">
            <Input placeholder="Add Beer" onChange={this.handleChange} value={this.state.beer}> </Input>
          </div>
          <div className="add-beer-to-cooler">
            <Button
              className="add-beer-to-cooler-btn"
              type="submit"
              variant="contained"
              color="secondary">
              Add Beer!
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(null, actions)(BeerInput)
