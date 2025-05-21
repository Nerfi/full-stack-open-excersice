interface outcome {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: String;
  target: number;
  average: number;
}

function calculateExercises(horas: number[], objetivo: number): outcome {
  const dailyHours = horas.reduce((acc, curr) => acc + curr, 0);
  const avergaDailyHours = dailyHours / horas.length;

  let amountOfDaystrained = 0;

  /// console.log(horas, "HORAS") works

  horas.map((h) => (h > 0 ? amountOfDaystrained++ : null));

  return {
    periodLength: horas.length,
    trainingDays: amountOfDaystrained,
    success: avergaDailyHours >= objetivo, //boolean, calcular despues,
    rating: 2,
    ratingDescription: "depends on other resul",
    target: objetivo,
    average: avergaDailyHours,
  };
}

export default calculateExercises;

//  const args = process.argv.slice(2);
//  const arrayString = args[3];

// // //console.log(process.argv, "ARGV")

// // //console.log(process.argv[1], "string arrat");
// const hoursArray = JSON.parse(arrayString);
//  const target = Number(args[2]);

// const secondArgument = Number(process.argv[3]);
try {
  //console.log(calculateExercises([ 2 ,1, 0, 2, 4.5, 0, 3, 1, 0], 4));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
