import {Pokemon} from "../types";

import {PokeballSvg} from "./PokeballSvg";

export function PokemonScreen({
  correct,
  pokemon,
  showPokemon,
  showPokeball,
}: {
  correct: boolean;
  pokemon: Pokemon;
  showPokemon: boolean;
  showPokeball: boolean;
}) {
  return (
    <>
      <section className="screen-container">
        <PokeballSvg showPokeball={showPokeball} />
        <div className="screen-image">
          <img
            alt={pokemon.name}
            className={`${showPokemon && "show-pokemon"} 
            ${showPokeball && "appear-pokemon"}`}
            src={pokemon.image}
          />
        </div>
        <div className="screen-name">
          <h1 className={`${showPokemon && "show-pokemon-name"}`}>
            {showPokemon ? `${pokemon.name}` : "?"}
          </h1>
        </div>
        {showPokemon && (
          <section className={`result-modal ${showPokemon && "modal-animation"}`}>
            <h1>{correct ? "Correct" : "Incorrect"}</h1>
          </section>
        )}
      </section>
    </>
  );
}
