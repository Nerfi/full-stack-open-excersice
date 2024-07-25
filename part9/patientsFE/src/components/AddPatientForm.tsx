/*
Haz que sea posible agregar nuevas entradas al diario desde el frontend. En este ejercicio puedes saltarte todas las validaciones y asumir 
que el usuario entra los datos en el formato correcto.
*/

import { useState } from "react";
import { Patient, addPatientType } from "../types/types";

export default function AddPatientForm() {
  const [fields, setFields] = useState<addPatientType>({
    name: "",
    dateOfBirth: "",
    gender: Patient.Default,
    occupation: "",
  });
  //handlers

  const submmitPerson = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // make post request to API
    console.log("YEYEYEY");
  };

  console.log(fields.name, "NAME");

  const onChangeHander = (e: React.ChangeEvent<HTMLInputElement>) => {
    //update the blody state
    const { name, value } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div>
      <form onSubmit={submmitPerson}>
        <label>name</label>
        <input
          type="text"
          name="name"
          value={fields.name as string}
          onChange={onChangeHander}
        />
        <button type="submit">Add patient</button>
      </form>
    </div>
  );
}
