const calculateBmi = (peso: number, altura: number): String => {
  const imc = (peso / ((altura * altura) / 10000)).toFixed(2);

  const convertIMC = Number(imc);

  //maybe change this for a swith

  if (convertIMC < 8.6) {
    return "under weight";
  } else if (convertIMC >= 18.6 && convertIMC < 24.9) {
    return "Normal weight";
  } else {
    return "over weight";
  }
};

// const peso: number = Number(process.argv[2]);

// const altura: number = Number(process.argv[3]);

//module.exports = calculateBmi;

export default calculateBmi

//console.log(calculateBmi(peso, altura));
