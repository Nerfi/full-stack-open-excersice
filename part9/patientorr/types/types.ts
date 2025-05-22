export type Diagnose = {
  code: string;
  name: string;
  latin?: string;
};
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {

}

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
};

export type PatientPublic = Omit<Patient, "ssn" | "entries">;
//hemos creado este type ya que en nuestro patientsServices en el metodo post el objeto que nos llega del usuario
// no tiene un ID, y este es el tipo que le damos a ese parametro
export type NewPatientEntry = Omit<Patient, "id">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
