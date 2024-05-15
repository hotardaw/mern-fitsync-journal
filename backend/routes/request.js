const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
dotenv.config()
const { OAuth2Client } = require('google-auth-library')

router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://localhost:3000')
  res.header('Referrer-Policy', 'no-referrer-when-downgrade')

  const redirectUrl = 'http://127.0.0.1:3000/oauth'

  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    redirectUrl
  )

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
    prompt: 'consent'
  })

  res.json({ url: authorizeUrl })
})

module.exports = router
