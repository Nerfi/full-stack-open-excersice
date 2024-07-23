import patientsData from "../data/patients";
import { PatientPublic } from "../types/types";

const getPatients = (): PatientPublic[] => {
  //excluyendo nosotros los tipos que no queremos mostrar, aun no entiendo porque

  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatients,
};
// lo dejamos aqui https://fullstackopen.com/es/part9/tipando_una_aplicacion_express
