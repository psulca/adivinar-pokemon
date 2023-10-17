import {useState, useEffect} from "react";

import {Pokemon} from "./types";
import {PokemonScreen} from "./components/PokemonScreen";
import {InputPokemon} from "./components/InputPokemon";
import {Scoreboard} from "./components/Scoreboard";
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
  const [correct, setCorrect] = useState(false);

  const getRandomPokemon = async () => {
    const randomPokemon = await pokemonApi.random();

    setPokemon(randomPokemon);
  };

  const handleGuessButton = (value: string) => {
    setGuessButtonClicked(true);
    setTotalTries((totalTries) => totalTries + 1);
    if (value === pokemon?.name) {
      setCorrect(true);
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
        setCorrect(false);
      }, 5000);

      return () => clearTimeout(timeout);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guessButtonClicked]);

  useEffect(() => {
    getRandomPokemon();
  }, []);

  return (
    <main>
      <div className="app-container">
        {pokemon && (
          <PokemonScreen
            correct={correct}
            pokemon={pokemon as Pokemon}
            showPokeball={showPokeball}
            showPokemon={guessButtonClicked}
          />
        )}
        <Scoreboard
          bestStreak={bestStreak}
          currentStreak={currentStreak}
          totalGuesses={totalGuesses}
          totalTries={totalTries}
        />
        <InputPokemon handleGuessButton={handleGuessButton} showPokeball={showPokeball} />
      </div>
    </main>
  );
}
export default App;
