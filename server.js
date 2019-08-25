const express = require('express')
const path = require('path')
const open = require('open')
const app = express()

app.use('/redesign', express.static(path.join(__dirname, 'redesign')))

const port = 8900
app.listen(port, async () => {
  const localUri = `http://localhost:${port}/redesign/`
  console.log('Preview server on:', localUri)
  await open(localUri)
})
