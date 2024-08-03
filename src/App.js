import { useState, useEffect } from "react";
import { useContinent } from "./useContinent";
import { useRandomCountries } from "./useRandomCountries";
import { useCountryDetails } from "./useCountryDetails";
import { useSearch } from "./useSearch";
import { nanoid } from "nanoid";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [continent, setContinent] = useState("");
  const { continentList, setContinentList } = useContinent(continent);
  const { randomList, setRandomList } = useRandomCountries();
  const { curCountry, fetchSingleCountry, setCurCountry } = useCountryDetails();
  const { searchList, setSearchList } = useSearch(searchValue, () => {
    setContinentList([]);
    setRandomList([]);
    setContinent("");
  });

  useEffect(() => {
    if (continent) {
      setSearchList([]);
      setRandomList([]);
    }
  }, [continent]);

  function handleBack() {
    setCurCountry(null);
  }

  function handleClick(name) {
    if (name) {
      fetchSingleCountry(name);
    }
  }

  return (
    <div className="w-full h-full bg-gray-50">
      <Navbar />
      {curCountry ? (
        ""
      ) : (
        <TextBoxOption
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setContinent={setContinent}
          continent={continent}
        />
      )}
      <NationalCardsBox
        continentList={continentList}
        searchList={searchList}
        handleBack={handleBack}
        curCountry={curCountry}
        handleClick={handleClick}
        randomList={randomList}
      />
    </div>
  );
}

function Navbar() {
  return (
    <div className=" p-5 border-solid border-2 bg-white ">
      <div className=" mx-auto w-full max-w-5xl flex items-center justify-between">
        <h1 className="font-bold text-2xl">Where in the world?</h1>
        <h2 className="font-bold cursor-pointer flex gap-2">
          <span>🌙</span>Dark Mode
        </h2>
      </div>
    </div>
  );
}

function TextBoxOption({
  searchValue,
  setSearchValue,
  setContinent,
  continent,
}) {
  return (
    <div className="p-5">
      <div className="mx-auto w-full max-w-5xl flex items-center justify-between gap-4">
        <div className="relative flex items-center max-w-xs flex-1">
          <p className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500">
            🔍
          </p>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10 pr-4 py-2 text-sm w-full h-11 border-2 border-transparent rounded-lg bg-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-300 transition-all"
            type="text"
            placeholder="Search for a country..."
          />
        </div>
        <select
          value={continent} // Set the value to the current continent state
          onChange={(e) => setContinent(e.target.value)}
          className="border-2 border-gray-300 rounded-lg p-2 bg-white text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 transition-all"
        >
          <option value="" disabled>
            Select a continent
          </option>
          <option value="africa">Africa</option>
          <option value="america">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
    </div>
  );
}

function NationalCardsBox({
  continentList,
  searchList,
  handleBack,
  randomList,
  handleClick,
  curCountry,
}) {
  return (
    <div className="p-5 w-full">
      <div
        className={`w-full max-w-5xl flex mx-auto flex-wrap items-center gap-5 ${
          curCountry ? "h-80" : ""
        }`}
      >
        {curCountry ? (
          <SingleNationShow curCountry={curCountry} onClick={handleBack} />
        ) : (
          <>
            {searchList.length > 0
              ? searchList.map((el) => (
                  <NationalCards
                    key={nanoid()} // Use nanoid for unique keys
                    onClick={handleClick}
                    nation={el}
                  />
                ))
              : continentList.length > 0
              ? continentList.map((el) => (
                  <NationalCards
                    key={nanoid()}
                    onClick={handleClick}
                    nation={el}
                  />
                ))
              : randomList.map((el) => (
                  <NationalCards
                    key={nanoid()}
                    onClick={handleClick}
                    nation={el}
                  />
                ))}
          </>
        )}
      </div>
    </div>
  );
}

function NationalCards({ nation, onClick }) {
  if (!nation || !nation.name || !nation.flags) return null;
  const {
    name: { common: name } = { common: "Bilinmeyen" },
    flags: { png: pngURL } = { png: "" },
    region = "Bilinmeyen",
    population = 0,
    capital = ["Bilinmeyen"],
  } = nation;

  const strPopulation = String(population);
  const chunks = [];
  for (let i = strPopulation.length; i > 0; i -= 3) {
    chunks.unshift(strPopulation.slice(Math.max(0, i - 3), i));
  }
  const result = chunks.join(".");

  return (
    <div
      onClick={() => onClick(name)}
      className="cursor-pointer grid grid-rows-2 w-full border-solid border-2 flex-1 min-w-[220px] max-w-[240px] h-auto"
    >
      <div>
        <img src={pngURL} alt={`Bayrak ${name}`} />
      </div>
      <div className="flex flex-col gap-1 p-5">
        <h2 className="font-bold">{name}</h2>
        <p>
          <em className="font-bold">Nüfus:</em> {result}
        </p>
        <p>
          <em className="font-bold">Bölge:</em> {region}
        </p>
        <p>
          <em className="font-bold">Başkent:</em> {capital[0]}
        </p>
      </div>
    </div>
  );
}

function SingleNationShow({ onClick, curCountry }) {
  const {
    name: { common: name },
    flags: { png: pngURL },
    region,
    population,
    capital,
  } = curCountry;
  return (
    <>
      <button onClick={onClick} className="bg-slate-300 rounded-lg p-2">
        &larr; Back
      </button>
      <div className="grid grid-cols-2 w-full h-full gap-5 ">
        <img className="w-full h-full" src={pngURL} />
        <div className="flex flex-col gap-4 p-6">
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex gap-5 h-fit flex-wrap ">
            <h2>
              <em className="font-bold text-xl">Capital:</em>
              {capital}
            </h2>
            <h2>
              <em className="font-bold text-xl">Region:</em>
              {region}
            </h2>
            <h2>
              <em className="font-bold text-xl">Population:</em>
              {population}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
