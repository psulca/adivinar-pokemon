import {useState, useEffect} from "react";

import {Pokemon} from "./types";
import {PokemonScreen} from "./components/PokemonScreen";
import {InputPokemon} from "./components/InputPokemon";
import pokemonApi from "./api";

function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const getRandomPokemon = async () => {
    const randomPokemon = await pokemonApi.random();

    setPokemon(randomPokemon);
  };

  useEffect(() => {
    getRandomPokemon();
  }, []);

  return (
    <main>
      {pokemon && <PokemonScreen pokemon={pokemon} />}
      <InputPokemon />
    </main>
  );
}
export default App;
