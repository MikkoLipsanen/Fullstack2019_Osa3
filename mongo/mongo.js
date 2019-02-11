const mongoose = require('mongoose')

const password = process.argv[2]

const url =
  `mongodb://mclipsan:${password}@ds127115.mlab.com:27115/puhelinluettelo`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if ( process.argv.length > 3 ) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(response => {
    console.log(`Lisätään ${person.name} numero ${person.number} luetteloon`);
    mongoose.connection.close();
  })
}
else {
  console.log('puhelinluettelo:')  
  Person.find({}).then(people => {
    people.forEach(person => {
      console.log(  
      person.name,
      person.number)
    })
  mongoose.connection.close()
})
}