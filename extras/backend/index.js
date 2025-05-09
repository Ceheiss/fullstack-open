const express = require('express')
const app = express()

app.use(express.json())
// Without the json-parser, the body property would be undefined.
// The json-parser takes the JSON data of a request, transforms it
// into a JavaScript object and then attaches it to the body property of
// the request object before the route handler is called.


let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  const note = notes.find(note => note.id === id);
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
});

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.delete('/api/nodes/:id', (req, res) => {
  const id  = req.params.id;
  const notes = notes.filter(note => note.id !== id);
  res.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})