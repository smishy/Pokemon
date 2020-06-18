import React, {useState, useEffect} from 'react';
import PokemonList from './PokemonList';
import Pagination from './Pagination';
import axios from 'axios';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl]=useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPageUrl, setNextPageUrl]=useState();
  const [prevPageUrl, setPrevPageUrl]=useState();
  const [loading, setLoading] =useState(true); //setting state for when initially a load screen appears, by default we're setting it to true.

  
  useEffect(() => {
    setLoading(true) //whenever or before we make a fetch request, want loading to be true
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false) //after successful req want loading to be false
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
    })

    return () => cancel() //whenever we make a new req, want old req to cancel, cleaning up.
  }, [currentPageUrl])

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  if(loading) return "Loading..."

  return (
    <>
    <PokemonList pokemon={pokemon} />
    <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
      </>
  );
}

export default App;
