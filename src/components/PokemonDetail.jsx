import React, { useState } from 'react';
import pokemons from '../data/pokemons';
import PokemonCard from './PokemonCard';

const Pokedex = () => {
  const [selectedType, setSelectedType] = useState('All');

  const types = ['All', ...new Set(pokemons.flatMap(pokemon => pokemon.types))];

  const filteredPokemons =
    selectedType === 'All'
      ? pokemons
      : pokemons.filter(pokemon => pokemon.types.includes(selectedType));

  return (
    <section className="pokedex">
      <h2>Pokédex</h2>
      <div className="type-filters">
        {types.map(type => (
          <button key={type} onClick={() => setSelectedType(type)}>
            {type}
          </button>
        ))}
      </div>
      <div className="pokemon-grid">
        {filteredPokemons.map(pokemon => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </section>
  );
};

export default Pokedex;
