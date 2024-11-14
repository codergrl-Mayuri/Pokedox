import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";

function Pokemon() {

    const [pokemon, setPokemon] = useState ([]);
    const [loading, setLoading] = useState (true);
    const [error, setError] = useState (null);
    const [search, setSearch] = useState ("");

    const API = "https://pokeapi.co/api/v2/pokemon";

    const fetchPokemon = async() => {
        try{
            const response = await fetch(API);
            const data = await response.json(); 
            //console.log(data);

            const detailedPokemonData = data.results.map( async(curPokemon) => {
                const response = await fetch(curPokemon.url);
                const data = await response.json();
                return data;
            })
            

            const detailedRespones = await Promise.all(detailedPokemonData)
            console.log(detailedRespones)
            setPokemon(detailedRespones)
        }
        catch(error){
            setError(error)
        }
        finally{
            setLoading(false)
        }

    }
    useEffect (() => {
        fetchPokemon();
    },[ ]);

    const searchData = pokemon.filter((curPokemon) => 
        curPokemon.name.toLowerCase().includes(search.toLowerCase())
    )

    if(loading){
        return(
            <div>loading.....</div>
        )
    }

    if(error){
        return(
            <div>{error.message}</div>
        )
    }

    return (
      <section className="container">
        <header>
            <h1>Can ya catch a Pokémon??</h1>
        </header>
        <div className="pokemon-search">
            <input 
            type="text" 
            placeholder="Search Pokemon" 
            value = {search} 
            onChange={(e)=> {setSearch(e.target.value)}}/>
        </div>
        <div>
            <ul className="cards">
            {searchData.map((curPokemon) => {
                return(<PokemonCard key={curPokemon.id} pokemonData={curPokemon} />)
            })}
            </ul>
        </div>
      </section>
    );
  }


export default Pokemon;

