const express = require('express')
const path = require('path')

const app = express()

app.use('/designer', express.static(path.join(__dirname, '../designer')))
app.use('/svg', express.static(path.join(__dirname, '../svg')))

module.exports = app
