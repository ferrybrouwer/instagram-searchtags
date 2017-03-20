import {evaluateWithTimeout} from './helpers'

const evaluate = {

  /**
   * Open login form page
   *
   * @param {Object}        page
   * @return {String}    `success` or `failed`
   */
  async openLoginForm(page) {
    const evaluate = async() => await page.open('https://www.instagram.com/accounts/login')
    return await evaluateWithTimeout(evaluate, (value) =>
      (value === 'success'))
  },

  /**
   * Open tag page
   *
   * @param   {Object}  page
   * @param   {String}  tag
   * @return  {String} `success` or `failed`
   */
  async openTagPage(page, tag) {
    const evaluate = async() => await page.open(`https://www.instagram.com/explore/tags/${tag}/?__a=1`)
    return await evaluateWithTimeout(evaluate, (value) => (value === 'success'))
  },

  /**
   * Get state if current page has a login form
   *
   * @param {Object}    page
   * @return {Boolean}
   */
  async hasLoginForm(page) {
    const evaluate = async() => await page.evaluate(() => (
      document.querySelector('input[name="username"]') !== null &&
      document.querySelector('input[name="password"]') !== null
    ))
    return await evaluateWithTimeout(evaluate, (value) => value === true)
  },

  /**
   * Submit the login form
   *
   * @param  {String} username
   * @param  {String} password
   * @return {Promise}
   */
  submitLoginForm(page, username, password) {
    return page.evaluate((username, password) => {
      const event         = new Event('input', {bubbles: true})
      const form          = document.querySelector('form')
      const inputUsername = form.querySelector('input[name="username"]')
      const inputPassword = form.querySelector('input[name="password"]')
      const button        = form.querySelector('button')

      inputUsername.value = username
      inputUsername.dispatchEvent(event)

      inputPassword.value = password
      inputPassword.dispatchEvent(event)

      button.click()
    }, username, password)
  },

  /**
   * Get page after submit
   *
   * @return {String}
   */
  async getPageAfterSubmit(page) {
    const evaluate = async() => await page.evaluate(() => Object.keys(_sharedData.entry_data)[0])
    return await evaluateWithTimeout(evaluate, (value) => value !== 'LoginAndSignupPage')
  },

  /**
   * Get body json
   *
   * @return {Object|false}
   */
  async getJson(page) {
    const evaluate = async() => await page.evaluate(() => {
      const pre  = document.querySelector('body > pre')
      const body = pre && pre.innerHTML
      let json   = false
      try { json = JSON.parse(body) } catch (err) {}
      return json
    })
    return await evaluateWithTimeout(evaluate, (value) => typeof value === 'object')
  }
}

export default evaluate
