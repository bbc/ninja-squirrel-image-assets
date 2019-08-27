const open = require('open')
const app = require('./scripts/app')

const port = 8900
app.listen(port, async () => {
  const localUri = `http://localhost:${port}/designer/`
  console.log('Preview server on:', localUri)
  await open(localUri)
})
