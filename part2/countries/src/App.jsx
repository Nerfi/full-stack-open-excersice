import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState();
  const [value, setValue] = useState("");
  const [matches, setMaches] = useState();
  const [wholeCountry, setWholeCountry] = useState();
  const [country, setCountry] = useState();
  const [countryWeather, setCountryWeather] = useState();
  // for testing the icon 
  const [icon,setIcon] = useState();

  //end point para todos los countries
  const ALLCOUNTRIES = "https://studies.cs.helsinki.fi/restcountries/api/all";

  const api_key = import.meta.env.VITE_SOME_KEY;


  useEffect(() => {
    axios.get(ALLCOUNTRIES).then((res) => {
      setWholeCountry(res.data);
      const allCountries = res.data.map((c) => c.name.common);
      setCountries(allCountries);
    })
    .catch(err => console.error(err.message))
  }, []);



  useEffect(() => {

    if(country) {
      let coordinates = country.latlng;
      const COUNTRYWEATHER = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]}.17&lon=${coordinates[1]}&appid=${api_key}`;

      axios.get(COUNTRYWEATHER)
      .then(res => setCountryWeather(res.data))
      .catch(err =>  console.error(err.message))
    }
  },[country])

  //handlers
  const handleChange = (e) => {
    setValue(e.target.value);
    //search in each key stroke
    const matches = countries
      .map((c) =>
        c.toLowerCase().includes(value.trim().toLowerCase()) ? c : null
      )
      .filter((match) => match !== null);

    setMaches(matches);

    // logic for single country
    if (matches && matches.length <= 1) {
      const singlecountry = wholeCountry?.find((c) =>
        matches.includes(c.name.common)
      );

      setCountry(singlecountry);
    }
  };



  return (
    <>
      <div>
        find countries{" "}
        <input type="text" value={value} onChange={handleChange} />
      </div>
      {switchComponent(matches, wholeCountry, setCountry)}
    
      <SingleCountry country={country} />
      <WeatherComponent country={country} countryWeather={countryWeather} />

    </>
  );
}

export default App;

//  components

const WeatherComponent = ({ country, countryWeather }) => {
  if (!country) {
    return;
  }

  return (
    <>
      <h4>Wather in country name </h4>
      <p> temperature {countryWeather.main.temp} Celsius</p>
      <img
        src={`http://openweathermap.org/img/wn/${countryWeather.weather[0].icon}.png`}
        alt="weather"
        width={80}
        height={80}
        
      />
      <p>wind {countryWeather.wind.speed} m/s</p>
    </>
  );
};

const SingleCountry = ({ country }) => {
  // little check in order to be able to destructure 
  if (!country) {
    return;
  }

  const { capital, area, languages, flags } = country;
  const languagesArr = Object.values(languages);

  return (
    <div>
      <h3> capital {capital}</h3>
      <p>area {area}</p>
      <h4>languages:</h4>
      <ul>
        {languagesArr.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>

      <img src={flags.png} alt="countryFlag" />
    </div>
  );
};

const TooManyTxt = () => {
  return <p>Too many matches, specify another filter</p>;
};

const CountriesListMatches = ({ matches, wholeCountry, setCountry }) => {
  // once clicked here update setCountry to be that country and show it in singlecountry component


  return matches?.map((m) => (
    <div key={m} style={{ display: "flex", padding: 2 }}>
      <p key={m}>{m}</p>
      <button
        onClick={() => {
          const selectedCountry = wholeCountry.find((c) => c.name.common === m);
          setCountry(selectedCountry);
        }}
      >
        show
      </button>
    </div>
  ));
};

const switchComponent = (matches, wholeCountry, setCountry) => {
  let component;

  switch (true) {
    case matches?.length >= 10:
      component = <TooManyTxt />;
      break;

    case matches?.length <= 10:
      component = (
        <CountriesListMatches
          matches={matches}
          wholeCountry={wholeCountry}
          setCountry={setCountry}
        />
      );

      break;

    // case matches?.length === 1:
    //   component = <SingleCountry country={country} />;
    //   break;

    default:
      component = null;
  }

  return component;
};
