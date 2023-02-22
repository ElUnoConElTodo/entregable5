import axios from "axios"
import { useEffect, useMemo, useState } from "react"

const usePokedex = () => {
    
    const [pokemons, setPokemons] = useState([])

    const [pokemonsFilter, setPokemonsFilter] = useState([])
  
    const [types, setTypes] = useState([])
  
    const [selectType, setSelectType] = useState("")
  
    const [pokemonName, setPokemonName] = useState("")
  
    const [currentPage, setCurrentPage] = useState(1)
    
    const handleChangeType = (e) =>{setSelectType(e.target.value)}

    const handleSubmit = (e) => {e.preventDefault()
      setPokemonName(e.target.pokemonName.value)
    }
    const handleNextPage = () => {
        const newPage = currentPage + 1    
        if(newPage > lastPage){
          setCurrentPage(1)
        }else {
          setCurrentPage(newPage)
        }
      }
     
      const handlePreviusPage = () => {
        const newPage = currentPage - 1
        if(newPage < 1){
          setCurrentPage(lastPage)
        }else{
          setCurrentPage(newPage)
        }
    }



      useEffect(() => {

        const URL = `https://pokeapi.co/api/v2/${selectType ? `type/${selectType}/` : "pokemon/?limit=1279" }`
        axios.get(URL)
        .then((res) => {
          if (selectType) {
            const pokemonByType = res.data.pokemon.map(pokemon => ({
              name: pokemon.pokemon.name,
              url: pokemon.pokemon.url,
            }))
            setPokemons(pokemonByType)
          }else {
            setPokemons(res.data.results)
          }
        })
        
        .catch((err) => console.log(err))
      }, [selectType])
    
      useEffect(() => {
        const pokemonByName = pokemons.filter(pokemon => pokemon.name.includes(pokemonName.toLowerCase()))
        setPokemonsFilter(pokemonByName)
      }, [pokemonName, pokemons])
      
      useEffect(() => {
            const URL = "https://pokeapi.co/api/v2/type/"
        axios.get(URL)
        .then((res) => setTypes(res.data.results))
        .catch((err) => console.log(err))
      }, [])
    
      useEffect(() => {
        setCurrentPage(1)
      }, [pokemons])
      const paginationLogic = () => {

        const pokemonPerPage = 16;
    
        const sliceStart = (currentPage - 1) * pokemonPerPage
        const sliceEnd = sliceStart + pokemonPerPage
        const pokemonsInPage = pokemonsFilter.slice(sliceStart, sliceEnd)
    
        const lastPage = Math.ceil(pokemonsFilter.length / pokemonPerPage) || 1
    
        const pagesPerBlock = 6
        const actualBlock = Math.ceil( currentPage / pagesPerBlock )
    
        const pagesInBlock = []    
        const minPage = (actualBlock * pagesPerBlock - pagesPerBlock) + 1
        const maxPage = actualBlock * pagesPerBlock
        for (let i = minPage; i <= maxPage; i++) {
          if (i <= lastPage){
            pagesInBlock.push(i)
          }
        }
        return {pagesInBlock, lastPage, pokemonsInPage}
      }
         
      const {pagesInBlock, lastPage, pokemonsInPage} = useMemo (()=>{
        return paginationLogic(pokemonsFilter, currentPage)
      }, [pokemonsFilter, currentPage]) 

    return{handleSubmit, handleChangeType, types, pokemonsInPage, handlePreviusPage, handleNextPage,
        pagesInBlock, setCurrentPage, lastPage
    }
}

export default usePokedex