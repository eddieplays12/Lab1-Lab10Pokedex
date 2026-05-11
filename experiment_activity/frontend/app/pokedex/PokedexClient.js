"use client";

import { useCallback, useEffect, useState } from "react";

export default function PokedexClient({ initialPokemon }) {
  const [search, setSearch] = useState("");
  const [current, setCurrent] = useState(initialPokemon.id);
  const [pokemon, setPokemon] = useState(initialPokemon);
  const [error, setError] = useState("");

  const getPokemonData = useCallback(async (nameOrId) => {
    if (!nameOrId) return;

    try {
      setError("");
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${String(nameOrId)
          .trim()
          .toLowerCase()}`
      );

      if (!response.ok) {
        setError("Pokemon not found");
        return;
      }

      const data = await response.json();
      setPokemon(data);
      setCurrent(data.id);
      setSearch("");
    } catch {
      setError("Unable to fetch Pokemon");
    }
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "ArrowRight") getPokemonData(current + 1);
      if (event.key === "ArrowLeft" && current > 1) getPokemonData(current - 1);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [current, getPokemonData]);

  const pokemonImage =
    pokemon.sprites.other?.showdown?.front_shiny ??
    pokemon.sprites.front_default ??
    "";

  return (
    <main className="pokedex-page">
      <h1 className="logo">POKEDEX</h1>

      <div className="search-container">
        <input
          id="name-input"
          type="text"
          placeholder="Name / id"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") getPokemonData(search);
          }}
        />

        <button
          id="search-btn"
          className="ball-container"
          type="button"
          aria-label="Search Pokemon"
          onClick={() => getPokemonData(search)}
        >
          <div className="upper-half-ball"></div>
          <div className="bottom-half-ball"></div>
          <div className="center-ball"></div>
          <div className="center-line"></div>
        </button>
      </div>

      <div id="pokedex">
        <div id="left-panel">
          <div className="left-top-container">
            <svg height="100" width="225" className="left-svg">
              <polyline
                points="0,75 70,75 90,38 224,38"
                style={{ fill: "none", stroke: "black", strokeWidth: 3 }}
              />
            </svg>
            <div className="lights-container">
              <div className="big-light-boarder">
                <div className="big-light blue">
                  <div className="big-dot light-blue"></div>
                </div>
              </div>
              <div className="small-lights-container">
                <div className="small-light red">
                  <div className="dot light-red"></div>
                </div>
                <div className="small-light yellow">
                  <div className="dot light-yellow"></div>
                </div>
                <div className="small-light green">
                  <div className="dot light-green"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="screen-container">
            <div className="screen">
              <div className="top-screen-lights">
                <div className="mini-light red"></div>
                <div className="mini-light red"></div>
              </div>
              <div id="main-screen">
                {pokemonImage && (
                  <img
                    id="main-screen-image"
                    key={pokemon.id}
                    src={pokemonImage}
                    alt={pokemon.name}
                  />
                )}
              </div>
              <div className="bottom-screen-lights">
                <div className="small-light red">
                  <div className="dot light-red"></div>
                </div>
                <div className="burger">
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="buttons-container">
            <div className="upper-buttons-container">
              <div className="big-button"></div>
              <div className="long-buttons-container">
                <div className="long-button red"></div>
                <div className="long-button light-blue"></div>
              </div>
            </div>

            <div className="nav-buttons-container">
              <div className="dots-container">
                <div>.</div>
                <div>.</div>
              </div>
              <div className="green-screen">
                <span id="name-screen">{error || pokemon.name}</span>
              </div>
              <div className="right-nav-container">
                <div className="nav-button">
                  <div className="nav-center-circle"></div>
                  <div className="nav-button-vertical"></div>
                  <div className="nav-button-horizontal">
                    <button
                      className="left-nav-button"
                      type="button"
                      aria-label="Previous Pokemon"
                      onClick={() => {
                        if (current > 1) getPokemonData(current - 1);
                      }}
                    ></button>
                    <button
                      className="right-nav-button"
                      type="button"
                      aria-label="Next Pokemon"
                      onClick={() => getPokemonData(current + 1)}
                    ></button>
                    <div className="border-top"></div>
                    <div className="border-bottom"></div>
                  </div>
                </div>
                <div className="bottom-right-nav-container">
                  <div className="small-light red">
                    <div className="dot light-red"></div>
                  </div>
                  <div className="dots-container">
                    <div className="black-dot">.</div>
                    <div className="black-dot">.</div>
                    <div className="black-dot">.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="right-panel">
          <div className="empty-container">
            <svg height="100%" width="100%">
              <polyline
                points="0,0 0,40 138,40 158,75 250,75 250,0 0,0"
                style={{ fill: "#f2f2f2", stroke: "none", strokeWidth: 3 }}
              />
              <polyline
                points="0,40 138,40 158,75 250,75"
                style={{ fill: "none", stroke: "black", strokeWidth: 3 }}
              />
            </svg>
          </div>

          <div className="top-screen-container">
            <div id="about-screen" className="right-panel-screen">
              Height: {pokemon.height * 10}cm Weight: {pokemon.weight / 10}kg
            </div>
          </div>

          <div className="square-buttons-container">
            <div className="blue-squares-container">
              {Array.from({ length: 10 }).map((_, index) => (
                <div className="blue-square" key={index}></div>
              ))}
            </div>
          </div>

          <div className="center-buttons-container">
            <div className="center-left-container">
              <div className="small-reds-container">
                <div className="small-light red">
                  <div className="dot light-red"></div>
                </div>
                <div className="small-light red">
                  <div className="dot light-red"></div>
                </div>
              </div>
              <div className="white-squares-container">
                <div className="white-square"></div>
                <div className="white-square"></div>
              </div>
            </div>
            <div className="center-right-container">
              <div className="thin-buttons-container">
                <div className="thin-button"></div>
                <div className="thin-button"></div>
              </div>
              <div className="yellow-button yellow">
                <div className="big-dot light-yellow"></div>
              </div>
            </div>
          </div>

          <div className="bottom-screens-container">
            <div id="type-screen" className="right-panel-screen">
              {pokemon.types[0]?.type.name ?? "type"}
            </div>
            <div id="id-screen" className="right-panel-screen">
              #{pokemon.id}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
