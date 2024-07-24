import express from "express";
import patientsServices from "../../services/patientsServices";
import toNewPatient from "../../utils/utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsServices.getPatients());
});

router.post("/", (req, res) => {
  //TODO: LLAMAR A LA FUNCION QUE CORRESPONDA DE SERVICES

  const newPatientEntry = toNewPatient(req.body);

  const addPatient = patientsServices.addNewPatient(newPatientEntry);

  res.json(addPatient);
});

export default router;
