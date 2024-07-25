import { useState, useEffect } from "react";
//just for the test
import { getAllPatients } from "./services";
import { IPatient } from "./types/types";
import Patient from "./components/Patient";
import AddPatientForm from "./components/AddPatientForm";
/*
Ejercicio 9.16
Crea una aplicación React con Typescript con 
configuraciones similares a las de las aplicaciones de esta sección. Obtén los diarios del backend y muéstralos en la pantalla. Haz todo el tipado requerido y asegúrate de que no hay errores de ESlint.

Recuerda mantener abierta la pestaña network. Podría darte una pista importante...

Puedes decidir como las entradas de los diarios son mostradas. Si lo deseas,
 podrías inspirarte en la figura de abajo. 
 Ten en cuenta que la API del backend no devuelve los comentarios del diario, 
 podrías modificarlo para que también los devuelva en la solicitud GET.
*/

function App() {
  const [patients, setAllPatiens] = useState<IPatient[]>([]);
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const allPatients = await getAllPatients();
        //here we must check property ok of the API
        // if (allPatients.statusText !== "OK") {
        //   return console.log("LQL");
        // }

        setAllPatiens(allPatients);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPatients();
  }, []);
  return (
    <>
      <div>
        <AddPatientForm />
      </div>
      Patients:{" "}
      <div>
        <Patient patients={patients} />
      </div>
    </>
  );
}

export default App;
