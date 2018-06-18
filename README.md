# Redux Async Loading

Tired of dispatching loading state for async actions? Try `redux-async-loading`!

## Installation
``` bash

 yarn add redux-async-loading
 // or
 npm install redux-async-loading --save

```

## Usage
Notice that Redux Async Loading is based on [Redux Thunk](https://github.com/reduxjs/redux-thunk).


### Step 1: Writing models

actions/count.js

``` javascript

export default (dispatch) => ({
  async increment () {
    await new Promise(resolve => setTimeout(resolve, 1000))
    // add your dispatch here
  },
})

```

actions/index.js

``` javascript

export { default as loading } from './loading'

```

### Step 2: Init

store.js

``` javascript
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import createReduxAsyncLoadingMiddleware, {
  createReducer,
  getInitialState,
} from 'redux-async-loading'
import * as actions from '@/actions'
import reducer from '@/reducers'

// create Loading reducer
const Loading = createReducer(
  getInitialState(actions)
)

const combinedReducers = combineReducers({
  Loading,
  // other reducers
  ...reducer,
})

const middleware = [
  createReduxAsyncLoadingMiddleware(actions),
  thunk,
]

const store = createStore(
  reducer,
  applyMiddleware(...middleware),
)
```

### Step 3: View

``` jsx
import React from 'react'
import { connect } from 'react-redux'

@connect(
  ({ Loading }) => ({
    loading: Loading.count.increment,
  })
)

class Count extends React.PureComponent {
  render () {
    return (
      <div>
        <button onClick={this.props.dispatch({ type: 'count/increment' })}> async action </button>
        {loading && <p> loading... </p>}
      </div>
    )
  }
}
```

## Contribution

PR & issue welcome.

## License

MIT
