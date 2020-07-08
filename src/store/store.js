import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

// Compose redux with DevTools IF available.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Add seperate middleware as an array
const middleware = [thunk]

// If redux-logger enabled, add to middleware (must be last in middleware array)
if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_SHOW_REDUX_LOGGER === 'true') {
  const { createLogger } = require('redux-logger')

  const logger = createLogger({
    collapsed: true,
    duration: true
  })

  middleware.push(logger)
}

// Export configured redux store.
export default function configureStore() {
  return createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middleware))
  )
}
