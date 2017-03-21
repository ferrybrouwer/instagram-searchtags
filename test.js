const InstagramSearchTags = require('./dist/index')

// create instance of InstagramSearchTags
const searchTags = new InstagramSearchTags({
  username: 'ferry.brouwer@gmail.com',
  password: 'fer6354',
})


async function init() {

  try {
    const login  = await searchTags.login()
    const dogTag = searchTags.createTag('dog')
    const catTag = searchTags.createTag('cat')

    console.log('total dog count', await dogTag.getTotalCount())
    console.log('total cat count', await catTag.getTotalCount())

    const dogNodes = await dogTag.fetchNodes(1)
    const catNodes = await catTag.fetchNodes(1)

    console.log(dogNodes[0])
    console.log(catNodes[0])

  } catch (err) {
    console.error(`Oops an error occurred: ${err.message}`)
  }

  await searchTags.close()

}

init()

