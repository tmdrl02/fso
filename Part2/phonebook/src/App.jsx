import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterShow, setFilterShow] = useState(false)
  const [filterTarget, setFilterTarget] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    if (persons.find(({ name }) => name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return

    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterShow(true)
    setFilterTarget(event.target.value)
  }

  const personsToShow = filterShow
    ? persons.filter(person => 
      person.name
      .toLowerCase()
      .split(' ')
      .some(word => word.includes(filterTarget.toLowerCase()))
      )
    : persons

  


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterTarget} onChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm 
      onSubmit={addPerson} 
      newName={newName} 
      nameHandler={handleNameChange}
      newNumber={newNumber}
      numberHandler={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App
