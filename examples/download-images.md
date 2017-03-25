# Example fetching nodes


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

    // login Instagram
    await searchTags.login()

    // create tag #dog
    const tag = searchTags.createTag('dog')

    // download 10 latest display images to `./images`
    await tag.downloadNodeDisplayImages('./images', 10)

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

    // create tag #dog
    const tag = searchTags.createTag('dog')

    // download 10 latest display images to `./images`
    return tag.downloadNodeDisplayImages('./images', 10)

  })
  .then(() => {

    // close connection
    return searchTags.close()

  })
  .catch((err) => {

    // close connection
    searchTags.close()

    console.error(`Error: ${err.message}`)

  })
```

_Run script with debug info in console:_

```
DEBUG=instagramsearchtags node .
```
