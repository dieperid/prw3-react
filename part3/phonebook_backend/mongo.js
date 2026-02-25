const mongoose = require('mongoose')
require('dotenv').config()

const { MONGODB_URI: url } = process.env
const args = process.argv.slice(2)

if (!url) {
  console.log('Missing MONGODB_URI in .env')
  process.exit(1)
}

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const main = async () => {
  try {
    await mongoose.connect(url)
    console.log('Connected to DB')

    if (args.length === 0) {
      const persons = await Person.find({})
      console.log('Phonebook:')
      persons.forEach((person) => {
        console.log(`${person.name} ${person.number}`)
      })
    } else if (args.length === 2) {
      const [name, number] = args

      const person = new Person({
        name,
        number,
      })

      await person.save()
      console.log(`Added ${name} number ${number} to the phonebook`)
    } else {
      console.log('Usage: node mongo.js [name] [number]')
      process.exitCode = 1
    }
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  } finally {
    await mongoose.connection.close()
  }
}

main()
