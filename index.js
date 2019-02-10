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

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(people => {
      response.json(people.map(person => person.toJSON()))
    })
    .catch(error => next(error))     
});
  
app.get('/info', (request, response) => {
  Person.find({})
  .then(people => {
    const count = people.length
  
  const content = `
    <div>
      <p>Puhelinluettelossa ${count} henkilön tiedot</p>
      <p>${new Date()}</p>
    </div>
    `
  response.send(content) 
  })
  .catch(error => next(error))  
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if(person) {
        response.json(person.toJSON())
      } else {
        response.status(204).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true})
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  
  const person = new Person ({
    name: body.name,
    number: body.number,
  })
  
  person.save()
    .then(savedPerson => {
      response.json(savedPerson.toJSON())
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})