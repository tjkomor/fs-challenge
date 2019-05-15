import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import React from 'react'
import reducers from 'reducers'
import reduxPromise from 'redux-promise'
import 'App.css'

export default ({ children, initialState = {} }) => {
  const store = createStore(reducers, initialState, applyMiddleware(reduxPromise))

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
