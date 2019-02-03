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
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })