import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from './services/personServices'
import './index.css'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterShow, setFilterShow] = useState(false)
  const [filterTarget, setFilterTarget] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    console.log('effect')
    personService.getAll()
    .then(initialPersons => {
      console.log('promise fulfilled')
      setPersons(initialPersons)
    })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    const existingPerson = persons.find(p => p.name == newName)
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber}

        personService
        .update(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
          setSuccessMessage(`Updated ${newName}'s number`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
          
        })
        .catch(error => {
          setErrorMessage(`Information of "${existingPerson.name}" was already removed from the server`)
          setTimeout(() => setErrorMessage(null), 5000)
          setPersons(persons.filter(p => p.id !== existingPerson.id))
        })
      }
      

    }
    
    
    personService
    .create(personObject)
    .then(response => {
      setPersons(persons.concat(response))
      setSuccessMessage(`Added ${newName}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      setNewName('')
      setNewNumber('')
      console.log(response)
    })
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id == id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
      .deleteItem(id)
      .then(() => {
        setPersons(persons.filter(p => p.id != id))
    })
    }


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
      {successMessage && <div className="success">{successMessage}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}
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
      <Persons persons={personsToShow} onDelete={deletePerson}/>
    </div>
  )
}

export default App
