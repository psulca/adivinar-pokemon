import {useState, useEffect} from "react";

import {Pokemon} from "./types";
import {PokemonScreen} from "./components/PokemonScreen";
import {InputPokemon} from "./components/InputPokemon";
import pokemonApi from "./api";

function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [guessButtonClicked, setGuessButtonClicked] = useState(false);
  const [bestStreak, setBestStreak] = useState(Number(localStorage.getItem("bestStreak")) || 0);
  const [currentStreak, setCurrentStreak] = useState(
    Number(localStorage.getItem("currentStreak")) || 0,
  );
  const [totalGuesses, setTotalGuesses] = useState(
    Number(localStorage.getItem("totalGuesses")) || 0,
  );
  const [totalTries, setTotalTries] = useState(Number(localStorage.getItem("totalTries")) || 0);
  const [showPokeball, setShowPokeball] = useState(true);

  const getRandomPokemon = async () => {
    const randomPokemon = await pokemonApi.random();

    setPokemon(randomPokemon);
  };

  const handleGuessButton = (value: string) => {
    setGuessButtonClicked(true);
    setTotalTries((totalTries) => totalTries + 1);
    if (value === pokemon?.name) {
      setCurrentStreak((currentStreak) => currentStreak + 1);
      setTotalGuesses((totalGuesses) => totalGuesses + 1);
      if (currentStreak >= bestStreak) {
        setBestStreak(currentStreak + 1);
      }
    } else {
      setCurrentStreak(0);
    }
  };

  useEffect(() => {
    if (guessButtonClicked) {
      localStorage.setItem("bestStreak", bestStreak.toString());
      localStorage.setItem("totalGuesses", totalGuesses.toString());
      localStorage.setItem("totalTries", totalTries.toString());
      localStorage.setItem("currentStreak", currentStreak.toString());
      setShowPokeball(false);
      const timeout = setTimeout(() => {
        getRandomPokemon();
        setGuessButtonClicked(false);
        setShowPokeball(true);
      }, 5000);

      return () => clearTimeout(timeout);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guessButtonClicked]);

  useEffect(() => {
    getRandomPokemon();
  }, []);

  return (
    <main>
      {pokemon && (
        <PokemonScreen
          pokemon={pokemon as Pokemon}
          showPokeball={showPokeball}
          showPokemon={guessButtonClicked}
        />
      )}
      <aside>
        {bestStreak} {currentStreak} {totalGuesses} {totalTries}
      </aside>
      <InputPokemon handleGuessButton={handleGuessButton} showPokeball={showPokeball} />
    </main>
  );
}
export default App;
