import React from 'react'

//here props is being passed instead of writing props.pokemon, we're destructuring it to {pokemon}.
export default function PokemonList({ pokemon }) {
    return (
        <div>
            {pokemon.map(p => (
        <div key={p}>{p}</div>
      ))}
        </div>
    )
}
