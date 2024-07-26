import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import { IPatient,addPatientType } from "../types/types";

const URL = "http://localhost:3001/api/patients";
const getAllPatients = async () => {
  const patients = await axios.get<IPatient[]>(URL);
  return patients.data;
};

const postPatient = async (patient: addPatientType): Promise<IPatient| undefined> => {
  try {
    const config: AxiosRequestConfig = {
      headers: {
        'Accept': 'application/json',
      } as RawAxiosRequestHeaders,
    };
    const addedPatient = await axios.post<IPatient>(URL, patient, config);
    return addedPatient.data;
  } catch (error) {
    if(axios.isAxiosError(error)) {
      console.log("axios error " + error)
      throw error;
    }

    console.error("Error posting patient:", error);
  
  }
};

export { getAllPatients, postPatient };
