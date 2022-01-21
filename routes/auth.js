const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })

  try {
    const saveUser = await newUser.save()
    res.status(200).json(saveUser)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
