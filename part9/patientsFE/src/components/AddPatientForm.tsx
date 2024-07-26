import { useState } from "react";
import { Patient, addPatientType } from "../types/types";
import { postPatient } from "../services";
import Error from "./Error";

export default function AddPatientForm() {
  const [error, setError] = useState("");
  const [fields, setFields] = useState<addPatientType>({
    name: "",
    dateOfBirth: "",
    gender: Patient.Default,
    occupation: "",
    ssn: "",
  });
  //handlers

  const submmitPerson = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await postPatient(fields);
    } catch (error: unknown | any) {
      setError(error.response.data.error as string); // maybe not the best idea

      console.error("Error adding patient:", error.response.data.error);
    }
  };

  const onChangeHander = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    //update the blody state
    const { name, value } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div>
      {error && <Error error={error} />}
      <form
        onSubmit={submmitPerson}
        id="patientForm"
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 450,
          marginBottom: 10,
        }}
      >
        <label>name</label>
        <input
          type="text"
          name="name"
          value={fields.name as string}
          onChange={onChangeHander}
        />
        <label>occupation</label>
        <input
          type="text"
          name="occupation"
          value={fields.occupation as string}
          onChange={onChangeHander}
        />
        <label>Birthday:</label>
        <input
          type="date"
          id="birthday"
          name="dateOfBirth"
          onChange={onChangeHander}
        ></input>

        <label>SSN</label>
        <input
          type="text"
          value={fields.ssn}
          onChange={onChangeHander}
          name="ssn"
        />

        <label>Gender</label>
        <select
          name="gender"
          form="patientForm"
          required
          onChange={onChangeHander}
        >
          <option value=""></option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">Add patient</button>
      </form>
    </div>
  );
}
