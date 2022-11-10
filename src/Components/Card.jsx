import React from "react";

const Card = ({ pokemon, loading, infoPokemon }) => {
  //Korten som används till pokemonsen, bild och klickfunktionen.
  return loading ? (
    <h1>Loading pokemons...</h1>
  ) : (
    pokemon.map((item) => {
      return (
        //Klickar på kortet så öppnas infon 'right content'
        <div className="card" key={item.id}>
          <h2>{item.id}</h2>
          <img src={item.sprites.front_default} alt="" />
          <button className="info" onClick={() => infoPokemon(item)}>
            Info
          </button>
          <h2>{item.name}</h2>
        </div>
      );
    })
  );
};

export default Card;
