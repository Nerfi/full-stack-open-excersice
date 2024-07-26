import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSinglePatient } from "../services";
import { useNavigate } from "react-router-dom";
import { IPatient } from "../types/types";

export default function SelectedPatient() {
  const [singlePatient, setSinglePatient] = useState<IPatient | undefined>();
  const idParams = useParams().id;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchSinglePatient = async () => {
      try {
        if (idParams !== undefined) {
          const patient = await getSinglePatient(idParams);
          console.log(patient, "PATIEN SINGLE ");
          setSinglePatient(patient);
        }
      } catch (error) {
        console.log(error, "the error");
      }
    };

    fetchSinglePatient();
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2>
        <strong>Patientor</strong>
      </h2>

      <button
        onClick={handleClick}
        style={{
          maxWidth: 200,
          minHeight: 50,
          backgroundColor: "blue",
          color: "white",
        }}
      >
        HOME
      </button>
      <div style={{ flexDirection: "column" }}>
        <h2>
          <strong>{singlePatient?.name}</strong>
        </h2>
        <div>ssn: {singlePatient?.ssn}</div>
        <div>occupation: {singlePatient?.occupation}</div>
      </div>
    </div>
  );
}
