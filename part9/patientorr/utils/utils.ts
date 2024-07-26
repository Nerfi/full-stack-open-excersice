import { NewPatientEntry, Gender } from "../types/types";
/*
La función debe procesar cada campo y asegurarse de que el valor de retorno sea exactamente del tipo NewDiaryEntry. Esto significa 
que debemos verificar cada campo por separado. */
const toNewPatient = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }


  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const checkObjectValues: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseName(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseName(object.occupation),
    };
    return checkObjectValues;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export default toNewPatient;

//parser function in order to check that the data in object POSt req
//is what we want it to be

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

//text is string es Declaración del Predicado de Tipo
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("no date or incorrect ");
  }

  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if ( !isString(gender) || !isGender(gender)) {
    throw new Error("gender malfformatted");
  }

  return gender;
};





