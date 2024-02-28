import { useState } from "react";
import Persons from "./Components/Persons";
import FormPerson from "./Components/Form";
import Filter from "./Components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterPerson, setfilterPerson] = useState("");
  //auxiliar state
  const [filteredPersons, setFilteredPerson] = useState([...persons]);

  const handleFilterPerson = (e) => {
    const newFilter = e.target.value.toLowerCase();
    setfilterPerson(newFilter);
    //searh for that person in persons array
    setFilteredPerson(
      newFilter
        ? persons.filter((person) =>
            person.name.toLowerCase().includes(newFilter)
          )
        : [...persons]
    );
  };

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const handleChangenumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const names = persons.map((p) => p.name);
    if (names.includes(newName)) {
      alert(`${newName} is already added`);
      return;
    }
    const updatedPersons = [...persons, { name: newName, number: newNumber }];
    setPersons(updatedPersons);
    // Update filteredPersons with the latest persons
    setFilteredPerson(updatedPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterPerson={filterPerson} handler={handleFilterPerson} />
      <FormPerson
        handleSubmit={handleSubmit}
        newName={newName}
        handleChange={handleChange}
        newNumber={newNumber}
        handleChangenumber={handleChangenumber}
      />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
