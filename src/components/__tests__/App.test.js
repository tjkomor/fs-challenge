import React from 'react'
import ReactDOM from 'react-dom'
import Cooler from 'components/BeerInput'
import Root from 'Root'
import { shallow } from 'enzyme'

it('displays the cooler', () => {
  const wrapper = shallow(<Root><Cooler /></Root>)

  expect(wrapper.find(Cooler).length).toEqual(1)
})
