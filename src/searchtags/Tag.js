import createPage from './createPage'
import evaluate from '../evaluate'
import FetchedNodes from './FetchedNodes'
import debug from 'debug'

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
   * @type {FetchedNodes}
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
   * @return  {FetchedNodes}
   */
  async fetchPage(maxId = null) {

    // create page
    const page = await createPage(this.instance)

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
    this.fetchedObject = new FetchedNodes(json)

    return this.fetchedObject
  }

  /**
   * Fetch nextPage
   *
   * @return {Object|Array}
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
   * @return  {Array}
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
}
