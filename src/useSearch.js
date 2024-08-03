import { useEffect, useState } from "react";

export function useSearch(query, callback) {
  const [searchList, setSearchList] = useState([]);
  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchCountryList() {
        try {
          callback();
          const res = await fetch(
            `https://restcountries.com/v3.1/name/${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("Something went wrong");

          const data = await res.json();
          if (data !== null) {
            setSearchList(data);
          }
        } catch (error) {
          if (error.name !== "AbortError") {
            console.log(error.message);
          }
        }
      }

      if (query) {
        fetchCountryList();
      }

      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { searchList, setSearchList };
}
