import React, { useState } from "react";
import Main from "./Main";
import "./Components/style.css";

function App() {
  //Här har vi usestaten Catchedpokemons som vi skickar till main
  const [catchedPokemons, setCatchedPokemons] = useState([]);

  return (
    <Main
      catchedPokemons={catchedPokemons}
      setCatchedPokemons={setCatchedPokemons}
    />
  );
}
export default App;
