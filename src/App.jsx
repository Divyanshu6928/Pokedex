import React, { useEffect, useState } from 'react';
import PokemonCard from './components/PokemonCard';
import PokemonModal from './components/PokemonModal';
import './index.css';
import assets from './assets/assets.js';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleRandomPokemon = () => {
        if (pokemonList.length > 0) {
          const randomIndex = Math.floor(Math.random() * pokemonList.length);
          setSelectedPokemon(pokemonList[randomIndex]);
        }
      };

  // Fetch Pokémon data
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        
        // Check if the response is valid
        if (!res.ok) {
          throw new Error('Failed to fetch Pokémon data.');
        }

        let data = await res.json();
        console.log('Fetched Pokémon List:', data);  // Log raw data

        // Fetch detailed data for each Pokémon
        const details = await Promise.all(
          data.results.map(async (poke) => {
            let res = await fetch(poke.url);
            return await res.json();
          })
        );

        console.log('Fetched Detailed Pokémon Info:', details);  // Log detailed Pokémon data
        setPokemonList(details);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);  // Log any errors
      }

      

    };

    fetchData();
  }, []);

  // Filter Pokémon based on search input
  const filtered = pokemonList.filter(poke =>
    poke.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <header>
        {/* <h1>Neon Pokédex</h1> */}
        {/* <img src="./src/assets/image.png" alt="can't display" /> */}
        <div className="header-text" color='black'>
          POKEMON
        </div>
        <div className='pokemon-detail-grid'>
          <div>
            <h1 color='black' className='pikachu-text'>PIKACHU</h1>
            <p className='pikachu-detail'>Pikachu is an Electric-type Pokémon and the official mascot of the Pokémon franchise. Recognized instantly by its bright yellow fur, long ears with black tips, and lightning bolt-shaped tail, Pikachu is loved by fans of all ages. It stores electricity in its red cheeks and can release powerful electric shocks, especially using its signature move, Thunderbolt. <br /> <br />

              Pikachu evolves from Pichu when it forms a strong bond of friendship with its Trainer. It can then evolve into Raichu when exposed to a Thunder Stone. However, Ash Ketchum’s Pikachu from the anime famously refuses to evolve, symbolizing pride and individuality. <br /> <br />

              Pikachu’s ability, Static, may paralyze opponents that touch it during battle. Despite its small size, it’s known for its agility, cleverness, and surprising strength. <br /> <br />

              Pikachu became a global icon through the Pokémon anime, games, and movies, including Detective Pikachu. Its cheerful “Pika Pika!” cry and expressive personality have made it one of the most beloved fictional characters worldwide. <br /> <br />

              Whether battling in games or starring in cartoons, Pikachu stands for friendship, courage, and fun. It’s not just a Pokémon—it’s the heart of the Pokémon world.</p>

              <button className='scroll-down-btn'>Scroll Down 👇</button>
              
          </div>
          <div>
            <img src={`${assets.pokemon}`} alt="" width={"200px"} height={"600px"}/>
            <button className='random-btn' onClick={handleRandomPokemon}>
               Meet your Pokémon BFFs! 🐾"
              </button>
          </div>
        </div>
        
      </header>

    

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Pokémon List */}
      <main className="pokemon-list">
        <h2>Explore All</h2>
        <div className="pokemon-grid">
          {filtered.length > 0 ? (
            filtered.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onClick={() => setSelectedPokemon(pokemon)} // Open modal on click
              />
            ))
          ) : (
            <p>Loading Pokémon...</p>
          )}
        </div>
      </main>

      {/* Pokémon Modal (Detailed View) */}
      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)} // Close modal
        />
      )}

      <footer>Made with 🧠 by Divyanshu</footer>
    </>
  );
}

export default App;
