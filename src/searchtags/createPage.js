/**
 * Create page from Phantom instance
 *
 * @param   {Phantom} instance
 * @return  {Promise.<Page>}
 */
export default async function createPage(instance) {
  const page = await instance.createPage()
  page.setting('userAgent', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36')
  page.setting('javascriptEnabled', true)
  page.setting('loadImages', false)

  return page
}
