import { useEffect, useState } from "react";

export function useRandomCountries() {
  const [randomList, setRandomList] = useState([]);

  useEffect(() => {
    async function fetchRandomCountries() {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        if (!res.ok) throw new Error("Something went wrong");

        const data = await res.json();
        let selectedCountries = [];

        while (selectedCountries.length < 8) {
          const randNum = Math.trunc(Math.random() * data.length);
          selectedCountries.push(data[randNum]);
        }

        setRandomList(selectedCountries);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchRandomCountries();
  }, []);

  return { randomList, setRandomList };
}
