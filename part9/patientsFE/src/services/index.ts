import axios from "axios";
import { IPatient,addPatientType } from "../types/types";

const URL = "http://localhost:3001/api/patients";
const getAllPatients = async () => {
  const patients = await axios.get<IPatient[]>(URL);
  return patients.data;
};

const postPatient = async (patient: addPatientType): Promise<IPatient> => {
  try {
    const addedPatient = await axios.post<IPatient>(URL, patient);
    return addedPatient.data;
  } catch (error) {
    console.error("Error posting patient:", error);
    throw error;
  }
};

export { getAllPatients, postPatient };
