import phantom from 'phantom'
import evaluate from './evaluate'
import debug from 'debug'

const logger = debug('instagramsearchtags')

phantom.cookiesEnabled    = true;
phantom.javascriptEnabled = true;

const facade = async({username, password, tag}) => {
  let json = false

  // create page
  const instance = await phantom.create()
  let page       = await instance.createPage()

  // set page settings...
  page.setting('userAgent', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36')
  page.setting('javascriptEnabled', true)
  page.setting('loadImages', false)

  // open login page
  logger('Open login page...')
  const statusOpenLoginPage = await evaluate.openLoginForm(page)
  if (statusOpenLoginPage !== 'success') {
    throw new Error(`Search for login page result in status: ${statusOpenLoginPage}`)
  }
  logger('Successfull open login page!')

  // check if login form exists
  logger('Validate inputfields login form...')
  const formExists = await evaluate.hasLoginForm(page)
  if (!formExists) {
    throw new Error(`Can not find a login form in login page`)
  }
  logger('Successfull found login form!')

  // Fill in credentials and submit login form
  logger('Fill in credentials and submit login form...')
  await evaluate.submitLoginForm(page, username, password)

  // Validate next page after login
  logger('Wait until page is submitted and check if page is not the login page...')
  const pageAfterLogin = await evaluate.getPageAfterSubmit(page)
  if (pageAfterLogin === 'LoginAndSignupPage') {
    throw new Error(`Can not login on Instagram with given credentials`)
  }
  logger('Successfull logged in!')

  // create new page
  page = await instance.createPage()

  // Open explore tag page
  logger('Open explore tag page...')
  const statusExploreTagPage = await evaluate.openTagPage(page, tag)
  if (statusExploreTagPage !== 'success') {
    throw new Error(`Can not open explore tags page`)
  }
  logger('Successfull opened explore tags page!')

  // Get json of explore tags
  logger('Get json object from explore tags page...')
  json = await evaluate.getJson(page)
  if (typeof json !== 'object') {
    throw new Error(`Can not fetch json object from explore tags page`)
  }
  logger('Successfull fetched data %j', json)

  // exit phantom instance
  await instance.exit();

  return json
}

module.exports = facade
