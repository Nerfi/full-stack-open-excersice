import { useState, useEffect } from "react";
import Persons from "./Components/Persons";
import FormPerson from "./Components/Form";
import Filter from "./Components/Filter";
import  personServices from "../services/index";



const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterPerson, setfilterPerson] = useState("");
  const [filteredPersons, setFilteredPerson] = useState([]);

 
//fetching wit axios
useEffect(() => {
  personServices
    .getAll()
    .then((response) => setPersons(response))
    .catch((err) => alert(err));
}, []);

  const handleFilterPerson = (e) => {
    const newFilter = e.target.value.toLowerCase();
    setfilterPerson(newFilter);

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

    const newPersonCreated = { name: newName, number: newNumber };

    personServices
      .create(newPersonCreated)
      .then((response) => setPersons([...persons, response]))
      .catch((err) => alert(err));
  };

  const handleDelete = (id) => {
    personServices.deletePerson(id)
    .then(() => setPersons((person) => {
       const newDate = person.filter(p =>  p.id !== id);
       return newDate;
   
       
    } ))
    .catch(err => console.log(err, " error"));

  }

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
      <Persons persons={persons} filtradas={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
