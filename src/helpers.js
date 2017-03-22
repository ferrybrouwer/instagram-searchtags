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

/**
 * Create page from Phantom instance with default settings
 *
 * @param   {Phantom} instance
 * @return  {Promise.<Page>}
 */
export async function createPhantomPage(instance) {
  const page = await instance.createPage()
  page.setting('userAgent', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36')
  page.setting('javascriptEnabled', true)
  page.setting('loadImages', false)

  return page
}
