import wrapLoading from './utils/core'
import { isPlainObject } from './utils/isPlainObject'

/**
 * base create redux async loading middleware
 *
 * @export
 * @param {object} actions - namespaced action models
 * @returns {function} redux async loading middleware
 */
export default function createMiddleware (models) {
  return ({ dispatch, getState }) => next => action => {
    if (
      // get `model/name` type actions
      isPlainObject(action) &&
      action.type.indexOf('/') > -1
    ) {
      const { type, ...payload } = action
      const [model, name] = type.split('/')

      // map action to dispatch
      const modelAction = models[model](dispatch, getState)[name]
      // Disabled loading wrap for plain object actions.
      const finalAction = typeof modelAction === 'function'
        ? wrapLoading(modelAction, model, name, payload)
        : modelAction

      // prepare for `redux-thunk`
      return next(finalAction)
    }

    return next(action)
  }
}