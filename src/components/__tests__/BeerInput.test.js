import React from 'react'
import ReactDOM from 'react-dom'
import BeerInput from 'components/BeerInput'
import Root from 'Root'
import { shallow } from 'enzyme'

it('shows a button', () => {
  const wrapper = shallow(<Root><BeerInput /></Root>).dive()
})
