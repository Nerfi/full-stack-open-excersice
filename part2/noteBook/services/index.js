import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

// lo hemos dejado aqui 
// https://fullstackopen.com/es/part3/guardando_datos_en_mongo_db

//mongodb+srv://fullstack:<password>@cluster0.wqnfqt4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


const getAll = () => {
    const request = axios.get(baseURL);
    return request.then(res => res.data);
}

const create = newObject => {
    const request = axios.post(baseURL, newObject)
    return request.then(response => response.data)
  }

  const update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject)
    return request.then(response => response.data)
  }

  const deletePerson = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    
    return request.then( resposne => resposne.data);
    
  }

  export default {getAll, create, update, deletePerson}