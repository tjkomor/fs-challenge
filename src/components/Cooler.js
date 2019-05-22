import React from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions'
import Beer from 'components/Beer'
import BeerInput from 'components/BeerInput'
import axios from 'axios'
import { localProxy, fsBeer } from 'endpoints'
import Button from '@material-ui/core/Button'
import FuzzySearch from 'fuzzy-search'
import Input from '@material-ui/core/Input';

class Cooler extends React.Component {
  state = {
    displayAddBeerInput: false,
    updatedBeers: [],
    fuzzySearch: false
  }

  fuzzySearch = (event) => {
    if (event.target.value.length > 0) {
      this.setState({fuzzySearch: true})
    } else {
      this.setState({fuzzySearch: false})
    }
    const searcher = new FuzzySearch(this.props.beers, ['name'], {
      caseSensitive: false,
    })
    this.setState({updatedBeers: searcher.search(event.target.value)})
  }

  componentDidMount() {
    this.props.openCooler()
  }

  renderFuzzyBeers() {
    return this.state.updatedBeers.map(beer => {
      return <Beer beer={beer}
        increaseLikes={this.increaseLikes}
        decreaseLikes={this.decreaseLikes}
      />
    })
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
        <Input placeholder="Search Cooler" onChange={this.fuzzySearch}> </Input>
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
          {this.state.displayAddBeerInput && <BeerInput />}
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
          {
            !this.state.fuzzySearch &&
            <ul>
              {this.renderBeers()}
            </ul>
          }
          {
            this.state.fuzzySearch &&
            <ul>
              {this.renderFuzzyBeers()}
            </ul>
          }

      </div>
    )
  }
}

function mapStateToProps(state) {
  return { beers: state.beers }
}

export default connect(mapStateToProps, actions)(Cooler)
