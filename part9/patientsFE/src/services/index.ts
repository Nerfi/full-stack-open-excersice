import axios from "axios";

const URL = "http://localhost:3001/api/patients";
const getAllPatients = async () => {
  const patients = await axios.get(URL);
  return patients.data;
};

export { getAllPatients };
