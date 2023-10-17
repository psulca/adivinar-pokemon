import {useRef} from "react";

interface InputPokemonProps {
  handleGuessButton: (value: string) => void;
  showPokeball: boolean;
}

export function InputPokemon({handleGuessButton, showPokeball}: InputPokemonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const handleGuessButtonClick = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputRef.current?.value !== "") {
      const inputValue = inputRef.current?.value;

      handleGuessButton(inputValue!);
      formRef.current?.reset();
    }
  };

  return (
    <form ref={formRef} className="input-pokemon" onSubmit={handleGuessButtonClick}>
      <input
        ref={inputRef}
        autoComplete="off"
        name="pokemon"
        placeholder="Pikachu, squirtle"
        type="text"
      />
      <button disabled={!showPokeball}>Guess Pokemon</button>
    </form>
  );
}
