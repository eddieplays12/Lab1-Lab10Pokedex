import PokedexClient from "./PokedexClient";
import "./pokedex.css";

async function getInitialPokemon() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/1", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch Pokemon");
  }

  return response.json();
}

export default async function PokedexPage() {
  const pokemon = await getInitialPokemon();

  return <PokedexClient initialPokemon={pokemon} />;
}
