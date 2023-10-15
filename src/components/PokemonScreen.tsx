import {Pokemon} from "../types";

import {PokeballSvg} from "./PokeballSvg";

export function PokemonScreen({pokemon}: {pokemon: Pokemon}) {
  return (
    <section className="screen-container">
      <PokeballSvg />
      <div className="screen-image">
        <img alt={pokemon.name} src={pokemon.image} />
      </div>
      <div className="screen-name">Screen Name</div>
    </section>
  );
}
