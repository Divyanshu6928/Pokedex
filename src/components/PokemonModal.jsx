import React from "react";
import "./PokemonModal.css";

const PokemonModal = ({ pokemon, onClose }) => {
  if (!pokemon) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="close-btn" onClick={onClose}>&times;</button>

        {/* Left Side: Images */}
        <div className="modal-left">
          {pokemon.sprites.other?.["official-artwork"]?.front_default && (
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={`${pokemon.name} official`}
            />
          )}
          <img
            src={pokemon.sprites.front_default}
            alt={`${pokemon.name} front`}
          />
          <img
            src={pokemon.sprites.back_default}
            alt={`${pokemon.name} back`}
          />
        </div>

        {/* Right Side: Info */}
        <div className="modal-right">
          <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>

          <div className="modal-info">
            <p><strong>Height:</strong> {pokemon.height}</p>
            <p><strong>Weight:</strong> {pokemon.weight}</p>
            <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>
          </div>

          <div className="modal-types">
            <h3>Types:</h3>
            <div className="type-badges">
              {pokemon.types.map((typeInfo, index) => (
                <span key={index} className="type-pill">
                  {typeInfo.type.name}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-stats">
            <h3>Stats:</h3>
            {pokemon.stats.map((stat, index) => (
              <div className="stat-bar" key={index}>
                <span>{stat.stat.name}</span>
                <div className="bar-bg">
                  <div
                    className="bar-fill"
                    style={{ width: `${Math.min(stat.base_stat, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;
