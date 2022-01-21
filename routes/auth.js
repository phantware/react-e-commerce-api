const express = require('express')
const router = express.Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')

//Register Route
router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  })

  try {
    const saveUser = await newUser.save()
    res.status(200).json(saveUser)
  } catch (error) {
    res.status(500).json(error)
  }
})

//Login Route

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    })
    !user && res.status(401).json('Wrong credentials')

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    )

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

    originalPassword !== req.body.password &&
      res.status(401).json('Wrong credential')

    const { password, ...others } = user._doc

    return res.status(200).json(others)
  } catch (error) {
    return res.status(500).json(error)
  }
})

module.exports = router
