# Instagram search hashtags

The [API of instagram](https://www.instagram.com/developer/endpoints/tags/)
limits search for hashtags by authorized user tags with a limit of 20 images.

Instead of using the API, this package scrapes data without any limits. It
uses [phantomjs](http://phantomjs.org/) to get the data.


## Usage

Call the function with your credentials of Intagram.
The function call returns a Promise:

    import instagramSearchTags from 'instagram-searchtags'

    instagramSearchTags({
        username: 'instagram-username-or-email',
        password: 'xxx',
        tag:      'dog'
    })
        .then((data) => {
            // do something cool with the data
        })
        .catch((err) => {
            // oops an error occured
        })


Add the environment variable `DEBUG=instagramsearchtags` to run with debug
information in the console.
