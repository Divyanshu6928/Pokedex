// PokemonCard.jsx
import React from 'react';

const PokemonCard = ({ pokemon, onClick }) => {
  return (
    <div className="pokemon-card" onClick={onClick}>
      <img
        src={pokemon.sprites.other.dream_world.front_default}
        alt={pokemon.name}
        className="pokemon-image"
      />
      <h3>{pokemon.name.toUpperCase()}</h3>
    </div>
  );
};

export default PokemonCard;
