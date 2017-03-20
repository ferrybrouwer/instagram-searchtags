/**
 * Evaluate with timeout
 *
 * @param  {Promise}  evaluate          The page evaluation of phantomjs
 * @param  {Function} matchEvaluation   Higher order function to match value
 * @param  {Number}   timeout           The amount of timeout
 * @return {mixed}
 */
export async function evaluateWithTimeout(evaluate, matchEvaluation, timeout = 5000) {
  let hasTimeout = false
  const t        = setTimeout(() => (hasTimeout = true), timeout)

  let value = await evaluate()
  while (!matchEvaluation(value) && !hasTimeout) {
    value = await evaluate()
  }
  clearTimeout(t)

  return value
}
