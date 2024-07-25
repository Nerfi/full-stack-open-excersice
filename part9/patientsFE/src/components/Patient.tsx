import { IPatient } from "../types/types";
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
            <span>{patient.name}</span>
            <span>{patient.occupation}</span>
          </div>
        );
      })}
    </div>
  );
}
