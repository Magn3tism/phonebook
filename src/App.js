import { useEffect, useState } from "react";

import Filter from "./components/Filter";
import Add from "./components/Add";
import Numbers from "./components/Numbers";
import { addNumber, deleteNumber, getAll } from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setNewFilter] = useState("");
  const [filteredPeople, setFiltredPeople] = useState(persons);

  useEffect(() => {
    getAll().then((allPeople) => {
      setPersons(allPeople);
      setFiltredPeople(allPeople);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    let filterLength = event.target.value.length;

    const newArray = persons.filter(
      (person) =>
        person.name.substring(0, filterLength).toUpperCase() ===
        event.target.value.toUpperCase()
    );

    setFiltredPeople(newArray);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newName || !newNumber) return;

    let exists = false;

    persons.forEach((person) => {
      if (person.name === newName) {
        alert(`${newName} already exists.`);
        exists = true;
      }
    });

    if (exists) return;

    addNumber({ name: newName, number: newNumber }).then((newPersons) => {
      setPersons(persons.concat(newPersons));
      setFiltredPeople(persons.concat(newPersons));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleDelete = (id) => {
    deleteNumber(id);
    let newPersons = persons.filter((person) => person.id !== id);

    setPersons(newPersons);
    setFiltredPeople(newPersons);
  };

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <Add
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />

      <Numbers people={filteredPeople} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
