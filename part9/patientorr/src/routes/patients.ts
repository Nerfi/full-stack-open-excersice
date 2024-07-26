import express from "express";
import patientsServices from "../../services/patientsServices";
import toNewPatient from "../../utils/utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsServices.getPatients());
});

router.post("/", async (req, res) => {
  try {
    // Transformar y validar datos de entrada
    const newPatientEntry = toNewPatient(req.body);
    
    // Llamar al servicio para añadir un nuevo paciente
    const addedPatient = await patientsServices.addNewPatient(newPatientEntry);
    
    // Enviar respuesta con el nuevo paciente añadido
    res.status(201).json(addedPatient);
  } catch (error: unknown) {
    console.error("Error al añadir nuevo paciente:", error);
    if(error instanceof Error) {
      res.status(400).json({ error: error.message +" erro thrown"});
    }

    res.status(400).json({error: "somethign went wrong"})
    // Enviar una respuesta de error con el estado apropiado
    
  }
});

export default router;
