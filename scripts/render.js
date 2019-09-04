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

const renderSVG = async({ width, height, inputFile, outputFile}) => {
  return renderImage({
    width,
    height,
    isLandscape: true,
    uri: `/designer/render.html?svgFile=${inputFile}`,
    file: outputFile
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
  }, 1200)
}

const screenshotRunner = async () => {
  await startServer()
  await renderSVG({ width: 1280, height: 1280, inputFile: 'Ninja-Squirrel-Avatar.svg', outputFile: 'Ninja-Squirrel.png' })
  await renderSVG({ width: 64, height: 64, inputFile: 'Ninja-Squirrel-Avatar.svg', outputFile: 'Ninja-Squirrel-64x64.png' })
  await renderSVG({ width: 32, height: 32, inputFile: 'Ninja-Squirrel-Avatar.svg', outputFile: 'Ninja-Squirrel-32x32.png' })
  await renderSVG({ width: 1280, height: 1280, inputFile: 'Ninja-Squirrel-on-White.svg', outputFile: 'Ninja-Squirrel-on-White.png' })
  await renderSVG({ width: 1280, height: 1280, inputFile: 'BBC-Ninja-Squirrels.svg', outputFile: 'BBC-Ninja-Squirrels.png' })
  await closeServer()
  killProcessAfter5Seconds()
}

screenshotRunner()
