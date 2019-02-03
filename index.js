const express = require('express')
const app = express()

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

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })