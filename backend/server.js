const express = require('express')
const dotenv = require('dotenv')
const notes = require('./data/notes')

const app = express()
dotenv.config()

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

// the /:id fetches the note _id param & is a number in the browser.
app.get('/api/notes/:id', (req, res) => {
  const note = notes.find((n) => n._id === req.params.id)
  res.send(note)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, console.log(`Server started on PORT ${PORT}`))
