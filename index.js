const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan  = require('morgan')
const cors = require('cors')

app.use(bodyParser.json())

app.use(cors())

morgan.token('new', (request) => {return JSON.stringify(request.body)})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :new'))

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '044-87651',
  },
  {
    id: 2,
    name: 'Arto Järvinen',
    number: '045-87651',
  },
  {
    id: 3,
    name: 'Lea Kutvonen',
    number: '046-87651',
  },
  {
    id: 4,
    name: 'Martti Tienari',
    number: '447-87651',
  },
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})
  
app.get('/info', (req, res) => {
    const content = `
      <div>
        <p>Puhelinluettelossa ${persons.length} henkilön tiedot</p>
        <p>${new Date()}</p>
      </div>
    `
    res.send(content)
  
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);
  
    response.status(204).end();
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (body.number === undefined) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }
  
  if (persons.some(p => p.name === body.name)){
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }
  
  const person = {
    id: getRandomInt(10000),
    name: body.name,
    number: body.number,
  }
  
  persons = persons.concat(person)
  
  response.json(person)
})


  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })