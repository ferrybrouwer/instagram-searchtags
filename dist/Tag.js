'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _helpers = require('./helpers');

var _evaluate = require('./evaluate');

var _evaluate2 = _interopRequireDefault(_evaluate);

var _Page = require('./Page');

var _Page2 = _interopRequireDefault(_Page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const logger = (0, _debug2.default)('instagramsearchtags');

class Tag {

  /**
   * @constructor
   * @param {Phantom} instance
   * @param {String}  tag
   */


  /**
   * @type {String}
   */
  constructor(instance, tag) {
    this.instance = null;
    this.tag = null;
    this.fetchedObject = null;

    Object.assign(this, { instance, tag });
  }

  /**
   * Get state if current fetched object has
   * a next page to fetch
   *
   * @return {Boolean}
   */


  /**
   * @type {Page}
   */


  /**
   *
   * @type {Phantom}
   */
  hasNextPage() {
    return this.fetchedObject && this.fetchedObject.hasNextPage();
  }

  /**
   * Get total count of tag nodes
   *
   * @return {Number}
   */
  getTotalCount() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const fetchedbject = _this.fetchedObject ? _this.fetchedObject : yield _this.fetchPage();

      return fetchedbject.getCount();
    })();
  }

  /**
   * Fetch page
   *
   * @param   {String} maxId
   * @throws  {Error}
   * @return  {Promise.<Page>}
   */
  fetchPage(maxId = null) {
    var _this2 = this;

    return _asyncToGenerator(function* () {

      // create page
      const page = yield (0, _helpers.createPhantomPage)(_this2.instance);

      // open explore tag page
      const openPageStatus = yield _evaluate2.default.openTagPage(page, _this2.tag, maxId);
      if (openPageStatus !== 'success') {
        throw new Error(`Can not open explore tag page for tag ${_this2.tag}`);
      }

      // get json
      const json = yield _evaluate2.default.getJson(page);
      if (typeof json !== 'object') {
        throw new Error(`Can not fetch json object from explore tag page for tag ${_this2.tag}`);
      }

      // store current fetched object
      _this2.fetchedObject = new _Page2.default(json);

      return _this2.fetchedObject;
    })();
  }

  /**
   * Fetch nextPage
   *
   * @return {Promise.<Object|Array>}
   */
  fetchNextPage() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      if (typeof _this3.fetchedObject !== 'object') {
        return yield _this3.fetch();
      }

      if (!_this3.hasNextPage()) {
        throw new Error(`There is no next page found`);
      }

      return yield _this3.fetch(_this3.fetchedObject.getNextPageMaxId());
    })();
  }

  /**
   * Fetch nodes
   *
   * @param   {Number} maxNodes   Maximum number of nodes, default to 20
   * @throws  {Error}
   * @return  {Promise.<Array>}
   */
  fetchNodes(maxNodes = 20) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      let nodes = [];
      let stopRun = false;
      let fetchedNodesInstance = null;

      while (!stopRun && nodes.length < maxNodes) {
        // check if has next page
        const hasNextPage = fetchedNodesInstance && fetchedNodesInstance.hasNextPage();

        // get next page id
        const maxId = hasNextPage ? fetchedNodesInstance.getNextPageMaxId() : null;

        // detect when to stop the while loop
        if (fetchedNodesInstance && !hasNextPage || nodes.length >= maxNodes) {
          stopRun = true;
        }

        // fetch page
        fetchedNodesInstance = yield _this4.fetchPage(maxId);

        // add nodes
        nodes = [...nodes, ...fetchedNodesInstance.getNodes()];

        // truncate nodes to max
        if (nodes.length > maxNodes) {
          nodes = nodes.slice(0, maxNodes);
        }
      }

      return nodes;
    })();
  }

  /**
   * Download node thumbnail images
   *
   * @param   {String} the destination to output images
   * @param   {Number} maxNodes Maximum number of nodes, default to 20
   * @throws  {Error}
   * @return  {Promise.<void>}
   */
  downloadNodeThumbnailImages(destinationDirectory, maxNodes = 20) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      logger(`downloading ${maxNodes || 20} node thumbnail images to ${destinationDirectory}`);

      // validate if destination directory exists
      yield (0, _helpers.isValidWritableDirectory)(destinationDirectory);

      // get array with node promises
      const promises = (yield _this5.fetchNodes(maxNodes)).map(function (node) {
        const { 1: name } = node.thumbnail_src.match(/([^\/]+)$/);
        return (0, _helpers.downloadFile)(`${destinationDirectory}/${name}`, node.thumbnail_src);
      });

      // resolve promises
      yield Promise.all(promises);
    })();
  }

  /**
   * Download node display images
   *
   * @param   {String} the destination to output images
   * @param   {Number} maxNodes
   * @throws  {Error}
   * @return  {Promise.<void>}
   */
  downloadNodeDisplayImages(destinationDirectory, maxNodes = 20) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      logger(`downloading ${maxNodes || 20} node display images to ${destinationDirectory}`);

      // validate if destination directory exists
      yield (0, _helpers.isValidWritableDirectory)(destinationDirectory);

      // get array with node promises
      const promises = (yield _this6.fetchNodes(maxNodes)).map(function (node) {
        const { 1: name } = node.display_src.match(/([^\/]+)$/);
        return (0, _helpers.downloadFile)(`${destinationDirectory}/${name}`, node.display_src);
      });

      // resolve promises
      yield Promise.all(promises);
    })();
  }
}
exports.default = Tag;