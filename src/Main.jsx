import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "./Components/Card";
import Pokeinfo from "./Components/Pokeinfo";
import RandomPokemon from "./Components/RandomPokemon";

import { AiFillCloseSquare } from "react-icons/ai";

const MAIN_URL = "https://pokeapi.co/api/v2/pokemon/";

const Main = ({ catchedPokemons, setCatchedPokemons }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [pokeDex, setPokeDex] = useState();
  const [wildPokemon, setWildPokemon] = useState({});
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(MAIN_URL);
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeData, setPokeData] = useState([]);

  //tar fram de randompokemonen som ligger till vänster på sidan
  const encounterWildPokemon = React.useCallback(
    (array) => {
      const RandomPokemon = array[Math.floor(Math.random() * pokeData.length)];

      setWildPokemon(RandomPokemon);
    },
    [pokeData.length]
  );
  //Tar fram alla pokemons på sidan via en array
  const getPokemon = React.useCallback(
    async (res) => {
      const array = [];
      res.forEach((element) => {});
      for (let i = 0; i < res.length; i++) {
        const result = await axios.get(res[i].url);
        array.push(result.data);
      }

      setPokeData(array);
      encounterWildPokemon(array);
    },
    [encounterWildPokemon]
  );
  
  const pokeFun = React.useCallback(async () => {
    setLoading(true);
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results);
    setLoading(false);
  }, [getPokemon, url]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  //Sökfunktionen som sorterar pokemons namnen, tar fram den pokemon du sökt på.

  const filterPokemons = React.useCallback(async () => {
    if (search?.trim().length > 0) {
      const pokemons = pokeData.filter((pok) => pok.name.includes(search));

      if (pokemons.length === 0) {
          setLoading(true);

          try {
            const { data: searchedPokemon } = await axios.get(
              `${MAIN_URL}${search.trim()}`
            );

            if (searchedPokemon) {
              setFilteredData([searchedPokemon]);
            }

            setLoading(false);
          } catch (error) {
            setLoading(false);
          }
      } else {
        setFilteredData(pokemons);
      }
    } else {
      setFilteredData(pokeData);
    }
  }, [pokeData, search]);

  //funktionen till knappen som släpper pokemonsen efter du fångat de.
  const releasePokemon = (id) => {
    setCatchedPokemons((state) => state.filter((p) => p.id !== id));
  };

  //funktionen till knappen Catch, som tar och sparar pokemonen till vänster på sidan
  const catchPokemon = (pokemon) => {
    setCatchedPokemons((state) => {
      const pomonExists = state.filter((p) => pokemon.id === p.id).length > 0;

      if (!pomonExists) {
        state = [...state, pokemon];
        state.sort(function (a, b) {
          return a.id - b.id;
        });
      }
      return state;
    });
    //Samt tar fram en ny random pokemon
    encounterWildPokemon(pokeData);
  };

  //Sökfuntionen att söka på pokemonsen  fungerar
  useEffect(() => {
    filterPokemons();
  }, [filterPokemons]);

  //Så att de catchade pokemonsen sparas när du byter url
  useEffect(() => {
    pokeFun();
  }, [pokeFun, url]);

  const heya = () => {
    if (pokeDex !== undefined && pokeDex != null) {
      document.getElementById("blah").focus();
      

      document.getElementById("blah").style.display = "inline-block";
      document.getElementById("inblah").style.display = "block";
      document.getElementById("b").style.display = "block";
      document.getElementById("full").style.pointerEvents = "none";
      document.getElementById("inblah").style.borderWidth = "1px solid black";
    } else if (pokeDex === null) {
      document.getElementById("inblah").style.display = "none";
      document.getElementById("blah").style.display = "none";
      document.getElementById("b").style.display = "none";
      document.getElementById("full").style.pointerEvents = "auto";
    }
  };

  return (
    <>
      {heya()}

      <div
        className="scroll"
        style={{ position: "relative", pointerEvents: "auto" }}
        id="full"
      >
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />

        {/* -----------Om wildpokemon finns kan du klicka på bilden och får fram information om den pokemonen  */}
        {Object.values(wildPokemon).length > 0 && (
          <RandomPokemon
            wildPokemon={wildPokemon}
            infoPokemon={(poke) => setPokeDex(poke)}
          />
        )}

        <button
          className="random-pokemon"
          onClick={() => encounterWildPokemon(pokeData)}
        >
          Refresh
        </button>
        {catchedPokemons.map((item) => {
          return (
            //Klickar på info så öppnas  'right content'
            <div className="card" key={item.id}>
              <button onClick={() => releasePokemon(item.id)}>X</button>
              <h2>{item.id}</h2>
              <img src={item.sprites.front_default} alt="" />
              <h2>{item.name}</h2>
            </div>
          );
        })}
        <div className="container">
          <div className="left-content">
            <Card
              pokemon={filteredData.length > 0 ? filteredData : pokeData}
              loading={loading}
              infoPokemon={(poke) => setPokeDex(poke)}
            />

            <div className="btn-group">
              {prevUrl && (
                <button
                  onClick={() => {
                    setPokeData([]);
                    setFilteredData([]);
                    setSearch("");
                    setUrl(prevUrl);
                  }}
                >
                  Previous
                </button>
              )}

              {nextUrl && (
                <button
                  onClick={() => {
                    setPokeData([]);
                    setFilteredData([]);
                    setSearch("");
                    setUrl(nextUrl);
                  }}
                >
                  Next
                </button>
              )}
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "50%",
              marginRight: "auto",
              marginLeft: "auto",
              width: "auto",
              height: "auto",
              backgroundColor: "transparent",
              position: "fixed",
              padding: 20,
              top: "10%",
              left: "50%",
              transform: "translate(-50%, 0)",
              pointerEvents: "none",
            }}
            id="blah"
          >
            <div
              style={{
                width: "auto",
                height: "auto",
                backgroundColor: "white",
                pointerEvents: "all",
                padding: 10,
                borderWidth: "2px",
                display: "none",
              }}
              id="inblah"
            >
              <div
                style={{
                  width: "auto",
                  height: "auto",
                  backgroundColor: "red",
                }}
                id="b"
              >
                {pokeDex && (
                  <AiFillCloseSquare
                    onClick={() => {
                      setPokeDex(null);
                    }}
                    size={30}
                    style={{ float: "left" }}
                  />
                )}
              </div>

              <Pokeinfo catchPokemon={catchPokemon} data={pokeDex} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Main;
