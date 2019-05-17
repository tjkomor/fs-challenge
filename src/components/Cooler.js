import React from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions'
import Beer from 'components/Beer'
import BeerInput from 'components/BeerInput'
import axios from 'axios'
import { localProxy, fsBeer } from 'endpoints'
import Button from '@material-ui/core/Button';

class Cooler extends React.Component {
  state = {
    displayAddBeerInput: false,
    updatedBeers: []
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

  fetchBeers = async () => {
    const response = await axios.get(localProxy + fsBeer)
    .then(response => {
      this.setState({updatedBeers: response.data})
    })
    .catch(error => {
      return new Error(error)
    })
  }

  setId = async (beer) => {
    let newBeer
    await this.fetchBeers().then(() => {
      this.state.updatedBeers.some(b => {
        if (b.name === beer.name) {
          newBeer = b
        }
      })
    })
    return newBeer
  }

  increaseLikes = async (beer) => {
    if (beer.id) {
      this.props.updateLikes(beer, 'increase')
    } else {
      let verifiedBeer = await this.setId(beer).then(result => Promise.resolve(result)).then(val => val)
      this.props.updateLikes(verifiedBeer, 'increase')
    }
  }

  decreaseLikes = async (beer) => {
    if (beer.id) {
      this.props.updateLikes(beer, 'decrease')
    } else {
      let verifiedBeer = await this.setId(beer).then(result => Promise.resolve(result)).then(val => val)
      this.props.updateLikes(verifiedBeer, 'decrease')
    }
  }

  toggleBeerInput = () => {
    this.setState({displayAddBeerInput: !this.state.displayAddBeerInput})
  }

  render() {
    return (
      <div>
        {!this.state.displayAddBeerInput &&
          <Button
            variant="contained"
            color="primary"
            className='add-beer'
            onClick={this.toggleBeerInput}>
            Click here to add your favorite beer!
          </Button>
        }
        <div>
          {this.state.displayAddBeerInput && <BeerInput didUpdate={this.didUpdate} />}
        </div>
        <div>
          {this.state.displayAddBeerInput &&
            <Button
              variant="contained"
              color="primary"
              className='done-adding-beer'
              onClick={this.toggleBeerInput}>
              I'm done adding beers!
            </Button>
          }
        </div>
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
