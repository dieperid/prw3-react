import { useState } from "react";
import Persons from "./components/Persons";
import Form from "./components/Form";
import Filter from "./components/Filter";
import { useEffect } from "react";
import personService from "./services/person.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const person = persons.find((p) => p.name === newName);
    if (person) {
      alert(
        `${newName} is already added to phonebook, replace the old number with a new one?`,
      );

      const updatedPerson = { ...person, number: newNumber };

      personService.update(person.id, updatedPerson).then((data) => {
        setPersons(persons.map((p) => (p.id === person.id ? data : p)));
        setMessage(`Updated ${newName}`);
        setTimeout(() => {
          setMessage(false);
        }, 3000);
      });

      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService
      .create(personObject)
      .then((data) => {
        setPersons(persons.concat(data));
        setMessage(`Added ${newName}`);
        setTimeout(() => {
          setMessage(false);
        }, 3000);
      })
      .catch((error) => {
        setMessage(`Error: ${error.response.data.error}`);
      });

    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (person) {
      if (window.confirm(`Delete ${person.name}?`)) {
        personService
          .remove(id)
          .then(() => {
            setPersons(persons.filter((p) => p.id !== id));
            setMessage(`Successfully deleted ${person.name}`);
            setTimeout(() => {
              setMessage(false);
            }, 3000);
          })
          .catch((error) => {
            console.log(error);
            setMessage(
              `Error : Information of ${person.name} has already been removed from server`,
            );
            setTimeout(() => {
              setMessage(false);
            }, 3000);
            setPersons(persons.filter((p) => p.id !== id));
          });
      }
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      {message && (
        <div
          className={
            message.includes("Error") ? "message error" : "message success"
          }
        >
          {message}
        </div>
      )}

      <Filter value={filter} onChange={handleFilterChange} />
      <h3>add a new</h3>
      <Form
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      ></Form>
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
