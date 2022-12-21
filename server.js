const express = require('express')
const request = require('request')
const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.get('/rss', (req, res) => {
  request(
    { url: 'https://feeds.soundcloud.com/users/soundcloud:users:36819139/sounds.rss' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message })
      }
      res.set('Content-Type', 'application/rss+xml')
      res.send(Buffer.from(body))
    }
  )
})

const PORT = process.env.PORT || 4050
app.listen(PORT, () => console.log(`listening on ${PORT}`))