import express from "express";
import patientsServices from "../../services/patientsServices";
import toNewPatient from "../../utils/utils";
import data from "../../data/patients";

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
    return res.status(201).json(addedPatient);
  } catch (error: unknown) {
    console.error("Error al añadir nuevo paciente:", error);
    // Enviar una respuesta de error con el estado apropiado
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message + " juan " });
    }
    return res.status(400).json({ error: "something went bad" });
  }
});


router.get("/:id", async (req, res) => {
  const id = req.params.id;
//  console.log(id, "THE ID ")// works
  const allPatients = data;
  console.log(allPatients)
  const selectedPatient = allPatients.find(patient => patient.id === id)
  res.send(selectedPatient);
  
})
export default router;
