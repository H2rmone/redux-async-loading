import * as types from './constants'

/**
 * wrap gobal loading state in redux
 *
 * @export
 * @param {fucntion} action async function u want to catch
 * @param {string} model name for model
 * @param {string} name name for aciton
 * @param {*} payload extra params passed by model dispatch
 * @returns {function} async action prepare for `thunk-middleware`
 */
export default function wrapLoading (
  action,
  model,
  name,
  payload,
) {
  return async (dispatch) => {
    // Get dispatch function from redux-thunk middleware.
    // Other arguments can aslo be obtained like `getState` or
    // additional param passed by `thunk.withExtraArgument`.

    dispatch({ type: types.START, payload: `${model}/${name}` })
    await action(payload)
    dispatch({ type: types.END, payload: `${model}/${name}` })
  }
}
