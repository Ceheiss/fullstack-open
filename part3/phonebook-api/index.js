const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json());

morgan.token('content', function (req, res) {
  return JSON.stringify({"name": req.body.name, "number": req.body.number})
});

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :content", {
  skip: function (req, res) { 
    return req.method !== 'POST'
  }
}));
// output example: POST /api/persons 200 69 - 19.267 ms {"name":"Arto Hellasion","number":"324343"}

const PORT = process.env.PORT || 3001



let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
});

app.get('/info', (req, res) => {
  const date = new Date().toString();
  res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find(person => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end()
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  persons = persons.filter(person => person.id !== id);
  res.status(204).end()
});

app.post('/api/persons', (req, res) => {
  const name = req.body.name;
  const number = req.body.number;
  const id = Math.floor(Math.random() * 10000000).toString();

  if (!req.body.name || !req.body.number) {
    return res.status(400).json({ 
      error: 'content missing' 
    })
  }

  for (p of persons) {
    if (p.name === name) {
      return res.status(400).json({
        error: 'name must be unique'
      })
    }
  }

  const person = {
    name,
    number,
    id
  }

  persons = persons.concat(person)
  res.json(person) 
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})