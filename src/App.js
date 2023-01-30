import { useEffect, useState } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import Add from "./components/Add";
import Numbers from "./components/Numbers";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setNewFilter] = useState("");
  const [filteredPeople, setFiltredPeople] = useState(persons);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
      setFiltredPeople(response.data);
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

    let newPersons = persons.concat({ name: newName, number: newNumber });

    setPersons(newPersons);
    setFiltredPeople(newPersons);
    setNewName("");
    setNewNumber("");
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

      <Numbers people={filteredPeople} />
    </div>
  );
};

export default App;
