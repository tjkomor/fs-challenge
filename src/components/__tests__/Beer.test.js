import React from 'react'
import ReactDOM from 'react-dom'
import Beer from 'components/Beer'
import { shallow } from 'enzyme'

it('displays the like and dislike buttons', () => {
  const beer = {id: 1, name: "Beer", likes: 0}
  const wrapper = shallow(<Beer beer={beer}/>)

  expect(wrapper.find('.like-btn').length).toEqual(1)
  expect(wrapper.find('.dislike-btn').length).toEqual(1)
})
