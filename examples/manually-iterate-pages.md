# Example manually iterate through images


## Example with node v7+ async/await:

_index.js:_

```javascript
import InstagramSearchTags from 'instagram-searchtags'

const searchTags = new InstagramSearchTags({
  username: 'instagram-username-or-email',
  password: 'xxx',
})

const example = async() => {
  try {

    // login instagram
    const login = await searchTags.login()

    // create #dog tag
    const tag= searchTags.createTag('dog')

    // fetch first page
    let page = await dogTag.fetchPage()

    console.log('dog tag count', page.getTotalCount())
    console.log('dog tag nodes', page.getNodes())
    console.log('page has next page', page.hasNextPage())

    if (page.hasNextPage()) {

      console.log('next page max id', page.getNextPageMaxId())

      page = await page.fetchNextPage()

      console.log('dog tag count', page.getTotalCount())
      console.log('dog tag nodes', page.getNodes())
      console.log('page has next page', page.hasNextPage())
    }

  } catch(err) {

    console.error(`Error: ${err.message}`)

  }

  await searchTags.close()
}
```

_Run script with debug info in console:_

```
DEBUG=instagramsearchtags node --harmony-async-await .
```


## Example with promises:

_index.js:_

```javascript
const InstagramSearchTags = require('./dist/index')

const searchTags = new InstagramSearchTags({
  username: 'instagram-username-or-email',
  password: 'xxx',
})

// login Instagram
searchTags.login()
  .then(() => {

    // create #dog tag
    const tag= searchTags.createTag('dog')

    // fetch first page
    return await dogTag.fetchPage()

  })
  .then((page) => {

    console.log('dog tag count', page.getTotalCount())
    console.log('dog tag nodes', page.getNodes())
    console.log('page has next page', page.hasNextPage())

    if (page.hasNextPage()) {

      console.log('next page max id', page.getNextPageMaxId())

      return await page.fetchNextPage()
    }

  })
  .then((page) => {
    console.log('dog tag count', page.getTotalCount())
    console.log('dog tag nodes', page.getNodes())
    console.log('page has next page', page.hasNextPage())
  })
  .catch((err) => {

    console.error(`Error: ${err.message}`)

  })
```

_Run script with debug info in console:_

```
DEBUG=instagramsearchtags node .
```
