# Instagram search hashtags

The [API of instagram](https://www.instagram.com/developer/endpoints/tags/)
limits search for hashtags by authorized user tags with a limit of 20 images.

Instead of using the API, this package scrapes data without any limits. It
uses [phantomjs](http://phantomjs.org/) to get the data.



## Usage

### Login to instagram

To start using this package you need to login into instagram in order
to search for hashtags, example:

    import InstagramSearchTags from 'instagram-searchtags'

    const searchTags = new InstagramSearchTags({
      username: 'instagram-username-or-email',
      password: 'xxx',
    })

    try {
      const login = await searchTags.login()
    } catch(err) {
      console.error(`Oops an error occurred: ${err.message}`)
    }


### Creating tag instance

The following code shows how to create an Tag object after you have logged in
successfully:

    ...

    const dogTag = searchTag.createTag('dog')

The following methods are available for this instance:

#### `Tag::fetchPage`

  > @parameter `maxId::String` This is optional. The `maxId` is the next page hash.

  > @return    `Page::Object`

Will fetch media object from first search page on instagram matching given
tag name.

#### `Tag::getTotalCount`

  > @return `::Number`

Will return the total count of tag nodes for matching tag


#### `Tag::hasNextPage`

  > @return `::Boolean`

Get the state if last fetched Page object contains a next page

#### `Tag::fetchNextPage`

  > @return `Page::Object`

Will fetch media object from next page

#### `Tag::fetchNodes`

  > @parameter `maxNodes::Number` Set the maximum amount of nodes

  > @return `::Array`

Will return an array of tag nodes.


### Page instance

A page instance is a dataset of a tag search. The following methods are available
for this object:

#### `Page::hasNextPage`

  > @return `::Boolean`

Get the state of current dataset if it has a next page

#### `Page::getNextPageMaxId`

  > @return `::Boolean::String` false when no next page is found

Get the `maxId` hash of the next page

#### `Page::getNodes`

  > @return `::Array`

Get media nodes from current dataset


#### `Page::getTotalCount`

  > @return `::Number`

Get total nodes count of tag search


### Close connection

The phantomjs instance needs to be closed when you are done searching
media tags, example:

    ...

    await searchTags.close()



## An example fetching and displaying tag nodes as images

    import InstagramSearchTags from 'instagram-searchtags'

    // create instance of InstagramSearchTags
    const searchTags = new InstagramSearchTags({
      username: 'instagram-username-or-email',
      password: 'xxx',
    })

    (async() => {

      try {

        // login to instagram
        const login = await searchTags.login()

        // create 2 search tags
        const dogTag = searchTags.createTag('dog')
        const catTag = searchTags.createTag('cat')

        // fetch 5 dog nodes from explore tag page
        const dogNodes = await dogTag.fetchNodes(5)

        // fetch 20 cat nodes from explore tag page
        const catNodes = await catTag.fetchNodes(20)

        // output all display images with a caption to body
        dogNodes.concat(catNodes).forEach((node) => {
          const fragment = document.createDocumentFragment()

          const image = new Image()
          image.src = node.thumbnail_src
          fragment.appendChild(image)

          const caption = document.createElement('div')
          caption.innerHTML = node.caption
          fragment.appendChild(caption)

          document.body.appendChild(fragment)
        })

      } catch (err) {

        console.error(`Oops an error occurred: ${err.message}`)

      }

      await searchTags.close()

    })();


## An example of get total tag node count

    import InstagramSearchTags from 'instagram-searchtags'

    // create instance of InstagramSearchTags
    const searchTags = new InstagramSearchTags({
      username: 'instagram-username-or-email',
      password: 'xxx',
    })

    (async() => {

      try {

        const login = await searchTags.login()

        const dogTag = searchTags.createTag('dog')

        console.log(`Total dog tag node count: ${await dogTag.getTotalCount()}`)

      } catch (err) {

        console.error(`Oops an error occurred: ${err.message}`)

      }

      await searchTags.close()

    })();


## An example to manually iterate through pages

      import InstagramSearchTags from 'instagram-searchtags'

      // create instance of InstagramSearchTags
      const searchTags = new InstagramSearchTags({
        username: 'instagram-username-or-email',
        password: 'xxx',
      })

      (async() => {

        try {

          const login = await searchTags.login()

          const dogTag = searchTags.createTag('dog')

          // fetch the first page
          let dogPage = await dogTag.fetchPage()

          // display count and nodes
          console.log('dog tag count', dogPage.getTotalCount())
          console.log('dog tag nodes', dogPage.getNodes())
          console.log('page has next page', dogPage.hasNextPage())

          if (dogPage.hasNextPage()) {

            // get the next page id (maxId)
            console.log('next page max id', dogPage.getNextPageMaxId())

            // fetch next page
            dogPage = await dogTag.fetchNextPage()

            // display count and nodes
            console.log('dog tag count', dogPage.getTotalCount())
            console.log('dog tag nodes', dogPage.getNodes())
            console.log('page has next page', dogPage.hasNextPage())
          }

        } catch (err) {

          console.error(`Oops an error occurred: ${err.message}`)

        }

        await searchTags.close()

      })();


Add the environment variable `DEBUG=instagramsearchtags` to run with debug
information in the console.
