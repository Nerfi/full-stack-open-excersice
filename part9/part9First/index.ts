import express from "express";
import bmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();
app.use(express.json())

app.get("/hello", (_req, res) => {
  res.send("hello full stack");
});

app.get("/bmi", (req, res) => {
  // obteneindo los parametros de la query enviada: http://localhost:3003/bmi?height=180&weight=72
  const peso = Number(req.query.weight);
  const altura = Number(req.query.height);
  const bodyMass = bmi(peso, altura);

  if (!peso || !altura) {
    res.json({
      error: "malformatted parameters",
    });
  }
  return res.json({
    weight: peso,
    height: altura,
    bmi: bodyMass,
  });
});

app.post("/exercises", (req, res) => {
   // console.log(req.body, "request body")
    const dailyExerciseInput = req.body.daily_exercises;
    const targetInput = req.body.target;

    if(!dailyExerciseInput  || !targetInput) {
        res.send({
            error:  "parameters missing"
        })
    }
    //check for malformatted params
    //console.log(!isNaN(targetInput) , "nana chekc ")
    if(!Array.isArray(dailyExerciseInput) || isNaN(targetInput) ) {
        res.send({
            error: "malformatted parameters"
        })
    }
    res.send(calculateExercises(dailyExerciseInput, targetInput))
    console.log(dailyExerciseInput, targetInput)
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


//lo dejamos aqui https://fullstackopen.com/es/part9/tipando_una_aplicacion_express