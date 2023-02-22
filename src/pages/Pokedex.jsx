import { useSelector } from 'react-redux'
import usePokedex from '../components/hooks/usePokedex'
import PokemonCard from '../components/pokedex/PokemonCard'
import "./style/Pokedex.css"

const Pokedex = () => {
  const nameTrainer = useSelector(store => store.nameTrainer)
  
  const {handleSubmit, handleChangeType, types, pokemonsInPage, handlePreviusPage, handleNextPage,
  pagesInBlock, setCurrentPage, lastPage } = usePokedex()
  
  return (
    <main className='pokedex'>
      <p><span className='welcome'>Welcomne {nameTrainer}, </span>here you can find information about your favorite pokemon.</p>
      <form className='pokedex_search-bar' onSubmit={handleSubmit}>
        <div className='pokedex__search'>
          <input className='pokedex__imput' type="text" id='pokemonName' placeholder='Search a pokemon...'/>
          <button className='pokedex_btn-search'>Search</button>
        </div>
        <select className='pokedex__select' onChange={handleChangeType}>
          <option value="">All pokemons</option>
          {
            types.map(type => <option key={type.url}>{type.name}</option>)
          }
        </select>
      </form>
      <section className='pokedex_cards'>
        {
          pokemonsInPage.map( pokemon => <PokemonCard  
            key={pokemon.url} pokemonUrl ={pokemon.url}/> )
        }
      </section>
      <section>
        <ul className='btn_list'>
          <li onClick={() =>setCurrentPage(1)}><button className='btn_list-jump'>{"<<<"}</button></li>
          <li><button className='btn_list-zise' onClick={handlePreviusPage}>{"<"}</button></li>
          {
            pagesInBlock.map(page => <li onClick={() => setCurrentPage(page)} key = {page}><button className='btn_list-zise'>{page}</button></li>)
          }
          <li onClick={handleNextPage}><button className='btn_list-zise'>{">"}</button></li>
          <li onClick={() =>setCurrentPage(lastPage)}><button className='btn_list-jump'>{">>>"}</button></li>
        </ul>
      </section>
    </main>
  )
}

export default Pokedex