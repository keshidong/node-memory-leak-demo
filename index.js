const express = require('express')
require('./debug')

const app = express()

let theThing = null

const replaceThing = function ( ) {
  const originalThing = theThing
  const unused = function () {
    if (originalThing) {
      console.log('hi')
    }
  }

  theThing = {
    longStr: new Int8Array(1000 * 1000 * 100),
    someMethod: function () {
      // unused()
      console.log('someMessage')
    }
  }
}

app.get('/leak', function (req, res) {
  replaceThing()
  return res.json({ message: 'EveryThing is fine' })
})

const port = 3333
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
