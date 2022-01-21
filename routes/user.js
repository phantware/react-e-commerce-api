const express = require('express')

const router = express.Router()

router.get('/userTest', (req, res) => {
  return res.send('I got here')
})

router.post('/userTest', (req, res) => {
  const { username } = req.body
  return res.send('Your username is ' + username)
})

module.exports = router
