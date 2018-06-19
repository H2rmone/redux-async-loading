
/**
 * create initial state for models
 *
 * @export
 * @param {object} entry models
 * @returns {object} initial loading state
 */
export default function getInitialState (entry) {
  const loading = {}

  for (const [key, value] of Object.entries(entry)) {
    // Make Group for each action models
    loading[key] = {}

    const model = value()
    // Set all actions to `false` for initial value
    Object.entries(model).forEach(([name, action]) => {
      if (typeof action !== 'function') return
      loading[key][name] = false
    })
  }

  return loading
}
