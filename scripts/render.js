const puppeteer = require('puppeteer')
const path = require('path')
const app = require('./app')

const screenshotDir = path.join(__dirname, '../baked/')

let server
let browser
let page

const bakePort = 18900
const startServer = () => {
  console.log('Opening local server:', `http://localhost:${bakePort}`)
  return new Promise((resolve, reject) => {
    server = app.listen(bakePort, resolve)
  })
}

const renderImage = async (viewport) => {
  const page = await openPage(viewport.uri)
  await page.setViewport(viewport)
  await page.evaluate(() => document.body.style.background = 'transparent')
  await page.screenshot({
    path: path.join(screenshotDir, viewport.file),
    omitBackground: true
  })
  console.log('Screenshot saved to', viewport.file, 'from', viewport.uri)
}

const openPage = async (uriPath) => {
  browser = await puppeteer.launch()
  page = await browser.newPage()
  await page.goto(`http://localhost:${bakePort}${uriPath}`)
  return page
}

const closeServer = async () => {
  console.log('Closing server')
  browser.close()
  server.close()
}

const killProcessAfter5Seconds = async () => {
  console.log('Preparing to kill server process')
  setTimeout(() => {
    console.log('Kill process')
    process.exit(0)
  }, 5000)
}

const screenshotRunner = async () => {
  await startServer()
  await renderImage({ width: 1280, height: 1280, isLandscape: true, uri: '/designer/render.html', file: 'Ninja-Squirrel.png' })
  await closeServer()
  killProcessAfter5Seconds()
}

screenshotRunner()
