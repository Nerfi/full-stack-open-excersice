export interface IPatient {
  dateOfBirth: String;
  gender: Patient;
  id: String;
  name: String;
  occupation: String;
  ssn: string
}

export enum Patient {
  Default = "",
  Male = "male",
  Female = "female",
  Other = "other",
}

export type addPatientType = Omit<IPatient, "id">;
