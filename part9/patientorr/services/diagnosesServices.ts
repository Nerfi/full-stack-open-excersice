import diagnosesData from "../data/diagnoses";
import { Diagnose } from "../types/types";

const getDiagnoses = (): Diagnose[] => {
  return diagnosesData;
};

export default {
  getDiagnoses,
};
