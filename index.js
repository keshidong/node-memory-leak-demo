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
    longStr: new Array(100000000).join('*'),
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
