const express = require('express')
const path = require('path')
const app = express()

app.use('/redesign', express.static(path.join(__dirname, 'redesign')))

const port = 8900
app.listen(port, () => {
  console.log('Preview server on:', `http://localhost:${port}/redesign/`)
})
