import debug from 'debug'
import {createPhantomPage, downloadFile, isValidWritableDirectory} from './helpers'
import evaluate from './evaluate'
import Page from './Page'

const logger = debug('instagramsearchtags')

export default class Tag {

  /**
   *
   * @type {Phantom}
   */
  instance = null

  /**
   * @type {String}
   */
  tag = null

  /**
   * @type {Page}
   */
  fetchedObject = null

  /**
   * @constructor
   * @param {Phantom} instance
   * @param {String}  tag
   */
  constructor(instance, tag) {
    Object.assign(this, {instance, tag})
  }

  /**
   * Get state if current fetched object has
   * a next page to fetch
   *
   * @return {Boolean}
   */
  hasNextPage() {
    return this.fetchedObject && this.fetchedObject.hasNextPage()
  }

  /**
   * Get total count of tag nodes
   *
   * @return {Number}
   */
  async getTotalCount() {
    const fetchedbject = this.fetchedObject ? this.fetchedObject : await this.fetchPage()

    return fetchedbject.getCount()
  }

  /**
   * Fetch page
   *
   * @param   {String} maxId
   * @throws  {Error}
   * @return  {Promise.<Page>}
   */
  async fetchPage(maxId = null) {

    // create page
    const page = await createPhantomPage(this.instance)

    // open explore tag page
    const openPageStatus = await evaluate.openTagPage(page, this.tag, maxId)
    if (openPageStatus !== 'success') {
      throw new Error(`Can not open explore tag page for tag ${this.tag}`)
    }

    // get json
    const json = await evaluate.getJson(page)
    if (typeof json !== 'object') {
      throw new Error(`Can not fetch json object from explore tag page for tag ${this.tag}`)
    }

    // store current fetched object
    this.fetchedObject = new Page(json)

    return this.fetchedObject
  }

  /**
   * Fetch nextPage
   *
   * @return {Promise.<Object|Array>}
   */
  async fetchNextPage() {
    if (typeof this.fetchedObject !== 'object') {
      return await this.fetch()
    }

    if (!this.hasNextPage()) {
      throw new Error(`There is no next page found`)
    }

    return await this.fetch(this.fetchedObject.getNextPageMaxId())
  }

  /**
   * Fetch nodes
   *
   * @param   {Number} maxNodes   Maximum number of nodes, default to 20
   * @throws  {Error}
   * @return  {Promise.<Array>}
   */
  async fetchNodes(maxNodes = 20) {
    let nodes                = []
    let stopRun              = false
    let fetchedNodesInstance = null

    while (!stopRun && nodes.length < maxNodes) {
      // check if has next page
      const hasNextPage = (fetchedNodesInstance && fetchedNodesInstance.hasNextPage())

      // get next page id
      const maxId = hasNextPage ? fetchedNodesInstance.getNextPageMaxId() : null

      // detect when to stop the while loop
      if ((fetchedNodesInstance && !hasNextPage) || nodes.length >= maxNodes) {
        stopRun = true
      }

      // fetch page
      fetchedNodesInstance = await this.fetchPage(maxId)

      // add nodes
      nodes = [...nodes, ...fetchedNodesInstance.getNodes()]

      // truncate nodes to max
      if (nodes.length > maxNodes) {
        nodes = nodes.slice(0, maxNodes)
      }
    }

    return nodes
  }

  /**
   * Download node thumbnail images
   *
   * @param   {String} the destination to output images
   * @param   {Number} maxNodes Maximum number of nodes, default to 20
   * @throws  {Error}
   * @return  {Promise.<void>}
   */
  async downloadNodeThumbnailImages(destinationDirectory, maxNodes = 20) {
    logger(`downloading ${maxNodes || 20} node thumbnail images to ${destinationDirectory}...`)

    // validate if destination directory exists
    await isValidWritableDirectory(destinationDirectory)

    // get array with node promises
    const promises = (await this.fetchNodes(maxNodes)).map((node) => {
      const {1:name} = node.thumbnail_src.match(/([^\/]+)$/)
      return downloadFile(`${destinationDirectory}/${name}`, node.thumbnail_src)
    })

    // resolve promises
    await Promise.all(promises)
  }

  /**
   * Download node display images
   *
   * @param   {String} the destination to output images
   * @param   {Number} maxNodes
   * @throws  {Error}
   * @return  {Promise.<void>}
   */
  async downloadNodeDisplayImages(destinationDirectory, maxNodes = 20) {
    logger(`downloading ${maxNodes || 20} node display images to ${destinationDirectory}...`)

    // validate if destination directory exists
    await isValidWritableDirectory(destinationDirectory)

    // get array with node promises
    const promises = (await this.fetchNodes(maxNodes)).map((node) => {
      const {1:name} = node.display_src.match(/([^\/]+)$/)
      return downloadFile(`${destinationDirectory}/${name}`, node.display_src)
    })

    // resolve promises
    await Promise.all(promises)
  }
}
