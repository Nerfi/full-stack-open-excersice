import patientsData from "../data/patients";
import { PatientPublic, Patient, NewPatientEntry } from "../types/types";
import { v4 as uuidv4 } from "uuid";

const getPatients = (): PatientPublic[] => {
  //excluyendo nosotros los tipos que no queremos mostrar, aun no entiendo porque, creo que por seguridad a la hora de no mostrar data sensible ni enviarla al front-end

  return patientsData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addNewPatient = (object: NewPatientEntry): Patient => {
  const idCreated = uuidv4();
  const newPatient = {
    ...object,
    id: idCreated,
  };

  //testing to add in data
  patientsData.push(newPatient);
  return newPatient;
};
export default {
  getPatients,
  addNewPatient,
};
