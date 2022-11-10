const RandomPokemon = ({ wildPokemon, infoPokemon }) => {
  //RandomPokemon, som det låter. här får vi upp de pokemonsen på vänster sida som du kan "refresha" och få upp en annan random match.
  // Om du väljer att klicka på bilden på pokemonen som kommer upp så får du fram "infopokemon" till höger där du kan läsa
  // om den och välja att "catch" eller ej.
  return (
    <div className="app-wrapper">
      <section className="wild-pokemon">
        <h2>Random Pokemons</h2>
        <div className="image-wrapper">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${wildPokemon.id}.svg`}
            className="sprite"
            alt="sprite"
            onClick={() => infoPokemon(wildPokemon)}
          />
        </div>
        <h3>{wildPokemon.name}</h3>
      </section>
    </div>
  );
};

export default RandomPokemon;
