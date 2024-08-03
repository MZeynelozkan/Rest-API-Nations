import { useState } from "react";

export function useCountryDetails() {
  const [curCountry, setCurCountry] = useState(null);

  const fetchSingleCountry = async (name) => {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
      if (!res.ok) throw new Error("Something went wrong");

      const data = await res.json();
      setCurCountry(data[0]);
    } catch (error) {
      console.log(error.message);
    }
  };

  return { curCountry, fetchSingleCountry, setCurCountry };
}
