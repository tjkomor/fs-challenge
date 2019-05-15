import React from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions'
import Beer from 'components/Beer'
import BeerInput from 'components/BeerInput'

class Cooler extends React.Component {
  state = {
    displayAddBeerInput: false
  }

  componentDidMount() {
    this.props.openCooler()
  }

  renderBeers() {
    return this.props.beers.map(beer => {
      return <Beer beer={beer}
        increaseLikes={this.increaseLikes}
        decreaseLikes={this.decreaseLikes}
      />
    })
  }

  increaseLikes = (beer) => {
    this.props.updateLikes(beer, 'increase')
  }

  decreaseLikes = (beer) => {
    this.props.updateLikes(beer, 'decrease')
  }

  toggleBeerInput = () => {
    this.setState({displayAddBeerInput: !this.state.displayAddBeerInput})
  }

  render() {
    return (
      <div>
        {!this.state.displayAddBeerInput &&
        <button
          className="add-beer"
          onClick={this.toggleBeerInput}
          >
          Click here to add your favorite beer!
        </button>}
        <div>
          {this.state.displayAddBeerInput && <BeerInput />}
        </div>
        <button
          className='done-adding-beer'
          onClick={this.toggleBeerInput}
          hidden={!this.state.displayAddBeerInput}>
          I'm done adding beers
        </button>
        <h1>Cooler Beers!</h1>
        <ul>
          {this.renderBeers()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { beers: state.beers }
}

export default connect(mapStateToProps, actions)(Cooler)
