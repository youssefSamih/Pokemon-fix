import React from "react";

const Pokeinfo = ({ data, catchPokemon }) => {
  //Här hämtar vi informationen om pokemonens "abilities", vi har knappen catch här som man kan trycka på efter att man har fått
  //upp informationen om pokemonsen.
  return data ? (
    <div
      className="pokeminfo"
      style={{
        height: "auto",
        width: "auto",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        padding: 20,
      }}
    >
      <h1>{data.name}</h1>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
        alt=""
      />
      <div className="abilities">
        {data.abilities.map((poke) => {
          return (
            <>
              <div className="group">
                <h2>{poke.ability.name}</h2>
              </div>
            </>
          );
        })}
      </div>
      <div className="base-stat">
        {data.stats.map((poke) => {
          return (
            <h3>
              {poke.stat.name}:{poke.base_stat}
            </h3>
          );
        })}
      </div>
      <button className="catch-btn" onClick={() => catchPokemon(data)}>
        Catch
      </button>
    </div>
  ) : undefined;
};
export default Pokeinfo;
