import {Pokemon} from "../types";

import {PokeballSvg} from "./PokeballSvg";

export function PokemonScreen({
  pokemon,
  showPokemon,
  showPokeball,
}: {
  pokemon: Pokemon;
  showPokemon: boolean;
  showPokeball: boolean;
}) {
  return (
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
    </section>
  );
}
