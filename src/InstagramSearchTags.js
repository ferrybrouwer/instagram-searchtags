import phantom from 'phantom'
import debug from 'debug'
import Tag from './Tag'
import {createPhantomPage} from './helpers'
import evaluate from './evaluate'

// default phantom settings
phantom.cookiesEnabled    = true
phantom.javascriptEnabled = true

// logger when environment is called with DEBUG=instagramsearchtags
const logger = debug('instagramsearchtags')

export default class App {
  _phantomInstance = null
  _isLoggedIn      = false

  /**
   * App constructor
   *
   * @constructor
   * @param {String} username
   * @param {String} password
   */
  constructor({username, password}) {
    Object.assign(this, {username, password})
  }

  /**
   * Login
   */
  async login() {
    // close connection if found
    if (this._phantomInstance) {
      await this._phantomInstance.exit()
    }

    // create new Phantom instance
    this._phantomInstance = await phantom.create()

    // create page
    const page = await createPhantomPage(this._phantomInstance)

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
    await evaluate.submitLoginForm(page, this.username, this.password)

    // Validate next page after login
    logger('Wait until page is submitted and check if page is not the login page...')
    const pageAfterLogin = await evaluate.getPageAfterSubmit(page)
    if (pageAfterLogin === 'LoginAndSignupPage') {
      throw new Error(`Can not login on Instagram with given credentials`)
    }
    logger('Successfull logged in!')

    // set new logged in state
    this._isLoggedIn = true
  }

  /**
   * Create tag
   *
   * @param   {String} tag
   * @return  {Tag}
   */
  createTag(tag) {
    if (!this._isLoggedIn) {
      throw new Error('Can only create tag if user is logged in.')
    }

    return new Tag(this._phantomInstance, tag)
  }

  /**
   * Close connection
   */
  async close() {
    if (this._phantomInstance) {
      await this._phantomInstance.exit()
    }
  }
}
