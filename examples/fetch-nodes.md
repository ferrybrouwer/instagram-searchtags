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

    // fetching 5 latest #dog nodes
    const nodes = await tag.fetchNodes(5)

    // ... do something cool with nodes

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

    // fetching 5 latest #dog nodes
    return tag.fetchNodes(5)

  })
  .then((nodes) => {

    // ... do something cool with nodes

    // close connection
    searchTags.close()

  })
  .catch((err) => {

    console.error(`Error: ${err.message}`)

    // close connection
    searchTags.close()

  })
```

_Run script with debug info in console:_

```
DEBUG=instagramsearchtags node .
```
