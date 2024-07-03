import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};
//hook personalizado
const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const [found, setFound] = useState(false);
  const baseURL = `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`;

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(baseURL);
        //console.log(response.data, "RESPONSE");
        if (response.data) {
          setCountry(response.data);
          setFound(true);
        } else {
          setFound(false);
        }
      } catch (error) {
        console.log(error, "the error ");
        setFound(false);
      }
    };

    fetchCountry();
  }, [name]);

  //console.log(country, "Fucking pais ");

  return { country, found };
};

const Country = ({ country }) => {
  console.log(country.found, "COUNTRY COMPO");

  if (!country.country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.country.name.common} </h3>
      <div>capital {country.country.capital} </div>
      <div>population {country.country.population}</div>
      <img
        src={country.country.flags.png}
        height="100"
        alt={`flag of ${country.country.name.common}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  console.log(country, "COUNTRY APP");

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
