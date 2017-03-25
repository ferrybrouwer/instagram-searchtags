'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class FetchedNodes {

  /**
   * Validate data object
   *
   * @throws  {Error}
   * @param   {Object} data
   */
  static validateObject(data) {
    if (typeof data.tag !== 'object') {
      throw new Error(`Fetched data object does not have a valid property object 'tag'`);
    }

    if (typeof data.tag.media !== 'object') {
      throw new Error(`Fetched data object does not have a valid property object 'tag.media'`);
    }

    if (typeof data.tag.media.page_info !== 'object') {
      throw new Error(`Fetched data object does not have a valid property object 'tag.media.page_info'`);
    }

    if (typeof data.tag.media.nodes !== 'object' || !Array.isArray(data.tag.media.nodes)) {
      throw new Error(`Fetched data object does not have a valid property array 'tag.media.nodes'`);
    }
  }

  /**
   * FetchedNodes constructor
   *
   * @constructor
   * @param {Object} data
   */
  constructor(data) {
    FetchedNodes.validateObject(data);
    this.media = data.tag.media;
    this.pageInfo = this.media.page_info;
    this.nodes = this.media.nodes;
  }

  /**
   * Get state if data object `page_info` has next page
   *
   * @return {boolean}
   */
  hasNextPage() {
    return this.pageInfo.has_next_page && typeof this.pageInfo.end_cursor === 'string' && this.pageInfo.end_cursor.length > 0;
  }

  /**
   * Get next page max id
   *
   * @return {String|false}
   */
  getNextPageMaxId() {
    return this.hasNextPage() ? this.pageInfo.end_cursor : false;
  }

  /**
   * Get nodes
   *
   * @return {Array}
   */
  getNodes() {
    return this.nodes;
  }

  /**
   * Get total count nodes
   *
   * @return {Number}
   */
  getTotalCount() {
    return this.media.count;
  }
}
exports.default = FetchedNodes;