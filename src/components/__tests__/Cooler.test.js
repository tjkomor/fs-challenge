import React from 'react'
import ReactDOM from 'react-dom'
import Cooler from 'components/Cooler'
import Root from 'Root'
import BeerInput from 'components/BeerInput'
import { shallow, mount } from 'enzyme'

it('calls increase likes and gets correct result', () => {
  const baseProps = {
    updateLikes: jest.fn(),
  };
  const beer = {id: 1, name: "Beer", likes: 0}
  const wrapper = shallow(<Root><Cooler {...baseProps} /></Root>).dive()
  console.log(wrapper.find('.search'))
})
