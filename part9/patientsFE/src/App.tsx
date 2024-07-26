import { useState, useEffect } from "react";
//just for the test
import { getAllPatients } from "./services";
import { IPatient } from "./types/types";
import Patient from "./components/Patient";
import AddPatientForm from "./components/AddPatientForm";

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
