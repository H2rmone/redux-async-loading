import * as types from './constants'

/**
 * create global loading reducer
 *
 * @export
 * @param {object} initialState initial state for each async action
 * @returns {function} loading reducer
 */
export default function createReducer (initialState) {
  return (state = initialState, action) => {
    const getState = (isLoading) => {
      const [model, name] = action.payload.split('/')
      state[model][name] = isLoading
      return { ...state }
    }

    switch (action.type) {
      case types.START:
        return getState(true)
      case types.END:
        return getState(false)
      default:
        return state
    }
  }
}
