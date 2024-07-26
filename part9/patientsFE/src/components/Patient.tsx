import { IPatient } from "../types/types";
import { Link } from "react-router-dom";
interface IProps {
  patients: IPatient[];
}

export default function Patient({ patients }: IProps) {
  return (
    <div>
      {patients.map((patient) => {
        return (
          <div key={patient.id as string}>
            <span>
              <strong>{patient.dateOfBirth}</strong>
            </span>
            <br />
            <span>{patient.gender}</span>
            <span>
              <Link to={`/patient/${patient.id}`}>{patient.name}</Link>{" "}
            </span>
            <span>{patient.occupation}</span>
          </div>
        );
      })}
    </div>
  );
}
