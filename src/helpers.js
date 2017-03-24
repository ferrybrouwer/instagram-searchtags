import request from 'request'
import promisify from 'promisify-node'
import debug from 'debug'

const logger = debug('instagramsearchtags')
const fs     = promisify('fs')

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

/**
 * Download file
 *
 * @param   {String} path
 * @param   {String} url
 * @return  {Promise.<void>}
 */
export const downloadFile = (path, url) => new Promise((resolve, reject) => {
  const file = fs.createWriteStream(path)
  const req  = request.get(url)
  req.pipe(file)

  const onError = (err) => {
    file.close()
    logger(`Error downloading image: ${err.message}`)
    reject(err)
  }

  file.on('finish', () => {
    file.close()
    logger(`Successfull downloaded image ${path}`)
    resolve()
  })

  file.on('error', onError)
  req.on('error', onError)
})

/**
 * Get state if given path is writable
 *
 * @param   {String} path
 * @throws  {Error}
 * @return  {Promise.<Boolean>}
 */
export async function isValidWritableDirectory(path) {
  await fs.access(path, fs.W_OK)
  const stat = await fs.stat(path)
  if (!stat.isDirectory()) {
    throw new Error(`${path} is not a directory!`)
  }

  return true
}
