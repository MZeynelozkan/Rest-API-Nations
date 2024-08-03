import { useEffect, useState } from "react";

export function useContinent(continent) {
  const [continentList, setContinentList] = useState([]);

  useEffect(() => {
    async function fetchContinent() {
      if (!continent) return;

      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/region/${continent}`
        );
        if (!res.ok) throw new Error("Something went wrong");

        const data = await res.json();
        let contList = [];

        while (contList.length < 8) {
          const randNum = Math.trunc(Math.random() * data.length);
          contList.push(data[randNum]);
        }

        setContinentList(contList);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchContinent();
  }, [continent]);

  return { continentList, setContinentList };
}
