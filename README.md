# Instagram search hashtags

[![npm version](https://badge.fury.io/js/instagram-searchtags.svg)](https://badge.fury.io/js/instagram-searchtags)
[![GitHub release](https://img.shields.io/github/release/ferrybrouwer/instagram-searchtags.svg)](https://github.com/ferrybrouwer/instagram-searchtags)
[![npm](https://img.shields.io/npm/dt/instagram-searchtags.svg)](https://www.npmjs.com/package/instagram-searchtags)


## Why this package?

The [API of instagram](https://www.instagram.com/developer/endpoints/tags/)
limits search for hashtags by authorized user tags only with a limit of 20 images.
The API also has a rate limit.

Before we could easily fetch all tags with the endpoints `/explore/tags`.
Instagram recently authorized these endpoints. Therefore it will not work for
third party apps.


Instead of using the API, this package scrapes data without any limits. It
uses [phantomjs](http://phantomjs.org/) to get the data.


## Install

```
npm install instagram-searchtags --save
```

## Usage

Add the environment variable `DEBUG=instagramsearchtags` to run with debug
information in the console, example:

```
DEBUG=instagramsearchtags node some-script.js
```

### Basic example: fetching 10 hashtag #dog nodes

```javascript
const InstagramSearchTags = require('instagram-searchtags')

// Create instance with your credentials
const searchTags = new InstagramSearchTags({
  username: 'instagram-username-or-email',
  password: 'xxx',
})

// Login Instagram with credentials
searchTags.login()
  .then(() => {

    // Create #dog tag
    const tag = searchTags.createTag('dog')

    // Fetch 10 latest nodes
    return tag.fetchNodes(10)

  })
  .then((nodes) => {

    // ... do something cool with nodes

    // close connection
    searchTags.close()

  })
  .catch((err) => {

    // close connection
    searchTags.close()

    console.error(`Error: ${err.message}`)

  })
```

### See other examples:

- [Fetching nodes](examples/fetch-nodes.md)
- [Manually iterate through pages](examples/manually-iterate-pages.md)
- [Download latest images](examples/download-images.md)

<u>Let's break it down in some basic steps</u>:

  1. Create an instance of `InstagramSearchTags` with your credentials
  2. Login with these credentials with the method `login()`, this method returns a Promise.
  3. After you've successfully logged in, you will be able to create tags with the method `createTag()`. This method returns a `Tag` instance.
  4. With the `Tag` instance you can invoke several fetch methods, such as `fetchNodes()` which returns a Promise with the resolved nodes.
  5. Close the PhantomJS connection with the `close()` method.


## Documentation

### `InstagramSearchTags` Class

The `InstagramSearchTags` Class is the main class to construct and destruct searching Instagram hashtags.

- <u>Create connection</u>:

	```javascript
	const searchTags = new InstagramSearchTags({
	  username: 'instagram-username-or-email',
	  password: 'xxx',
	})
	```

- <u>Create `Tag` instance</u>:

	Method structure _(pseudo code)_:<br />
	`InstagramSearchTags.createTag(:String): Tag`

	```javascript
	const dogTag = searchTags.createTag('dog')
	```

- <u>Close connection</u>:

	Method structure _(pseudo code)_:<br />
	`InstagramSearchTags.close(): Promise.<void>`
	```javascript
	await searchTags.close()
	```

### `Tag` Class

The `Tag` Class is used to create tags and fetch data from it.

- <u>Fetching single page</u>:

	Method structure _(pseudo code)_:<br />
	`Tag.fetchPage(maxId:String): Promise.<Page>`

	*This method fetch a single page object including top_posts etc.<br />
	The parameter `maxId` is the hash for the page to fetch (this is optional).*

	```javascript
	const page = await tag.fetchPage()
	```

- <u>Fetching next page</u>:

	Method structure _(pseudo code)_:<br />
	`Tag.fetchNextPage(): Promise.<Page>`

	*This method fetch the next page. Useful for manually iterate through pages*

	```javascript
	const page = await tag.fetchPage()

	if (page.hasNextPage()) {
	  const nextPage = await tag.fetchNextPage()
	}
	```


- <u>Fetching nodes</u>:

	Method structure _(pseudo code)_:<br />
	`Tag.fetchNodes(maxNodes:Number): Promise.<Array>`

	*This method fetch media nodes with a maximum.
	Internal it uses `fetchPage` and `fetchNextPage` recursively till the nodes Array is constructed.*

	```javascript
	const nodes = await tag.fetchNodes(20)
	```

- <u>Download thumbnail images</u>:

	Method structure _(pseudo code)_:<br />
	`Tag.downloadNodeThumbnailImages(destinationDirectory:String, maxNodes:Number): Promise.<void>`

	*This method fetch media nodes with a maximum if `maxNodes` and download image to `destinationDirectory`. It uses the property `thumbnail_src` from a single node.*

	```javascript
	const nodes = await tag.downloadNodeThumbnailImages('./images', 20)
	```

- <u>Download display images</u>:

	Method structure _(pseudo code)_:<br />
	`Tag.downloadNodeDisplayImages(destinationDirectory:String, maxNodes:Number): Promise.<void>`

	*This method fetch media nodes with a maximum if `maxNodes` and download image to `destinationDirectory`. It uses the property `display_src` from a single node.*

	```javascript
	const nodes = await tag.downloadNodeDisplayImages('./images', 20)
	```

- <u>Get the total amount of media nodes found for given tag query.</u>:

	Method structure _(pseudo code)_:<br />
	`Tag.getTotalCount(): Promise.<Number>`

	```javascript
	const totalCount = await tag.getTotalCount()
	```

- <u>Get state if has next page</u>:

	Method structure _(pseudo code)_:<br />
	`Tag.hasNextPage(): Boolean`

	```javascript
	const hasNextPage = tag.hasNextPage()
	```


### `Page` Class

The `Page` Class is generated by `Tag` instances. It provide an interface of fetching data.
This class represent a single Instagram query `/explore/tags/${tag}?__a=1` entry.


- <u>Get state if has next page</u>:

	Method structure _(pseudo code)_:<br />
	`page.hasNextPage(): Boolean`

	```javascript
	const hasNextPage = page.hasNextPage()
	```

- <u>Get next page hash (maxId)</u>:

	Method structure _(pseudo code)_:<br />
	`page.getNextPageMaxId(): String|Boolean.<false>`

	*Get the hash `maxId` for the next page. Returns false when there is no next page found.*

	```javascript
	const maxId = page.getNextPageMaxId()
	```

- <u>Get page nodes</u>:

	Method structure _(pseudo code)_:<br />
	`page.getNodes(): Array`

	*Returns all media nodes of page*

	```javascript
	const nodes = page.getNodes()
	```

- <u>Get total result count of tag</u>:

	Method structure _(pseudo code)_:<br />
	`page.getTotalCount(): Number`

	*The result of this method is the same as for `Tag.prototype.getTotalCount()`*

	```javascript
	const totalNodeCount = page.getTotalCount()
	```
