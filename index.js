require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan  = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(bodyParser.json())

app.use(cors())

morgan.token('new', (request) => {return JSON.stringify(request.body)})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :new'))

app.use(express.static('build'))


app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people.map(person => person.toJSON()))
  });     
});
  
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
  Person.findById(request.params.id).then(person =>
    response.json(person.toJSON())
  )
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }

  if (body.number === undefined) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }
  
  const person = new Person ({
    name: body.name,
    number: body.number,
  })
  
  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON())
  })
})


  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })