const express = require('express')
const path = require('path')
const open = require('open')
const app = express()

app.use('/designer', express.static(path.join(__dirname, 'designer')))
app.use('/svg', express.static(path.join(__dirname, 'svg')))

const port = 8900
app.listen(port, async () => {
  const localUri = `http://localhost:${port}/designer/`
  console.log('Preview server on:', localUri)
  await open(localUri)
})
