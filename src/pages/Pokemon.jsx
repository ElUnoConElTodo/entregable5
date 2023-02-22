import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./style/Pokemon.css"

const Pokemon = () => {
  const [pokemon, setPokemon] = useState()

  const {id} = useParams()
  const getPercentBar = (stat) => {
    const percent = (stat*100) / 255
    return `${percent}%`
  }

useEffect(() => {
  const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`
  axios.get(URL)
  .then((res) => setPokemon(res.data))
  .catch((err) => console.log(err))  
}, [])
  

  return (
    <main className= 'pokemon'>
      <section className={`pokemon__header bg-lg-${pokemon?.types[0].type.name}`}>
        <section>
          <div className='pokemon__img'>
            <img className='pokemon__img-zise' src={pokemon?.sprites.other["official-artwork"].front_default} alt=""/>
          </div>
        </section>
      </section>

      <section className='pokemon__body'>

        <div className='border_number'>
          <h2 className='pokemon__number'># {pokemon?.id}</h2>
        </div>
        <h2 className='pokemon__name'>{pokemon?.name}</h2>

        <div className='pokemon_zise'>
          <div>
            <h5 className='weight__name'>Weight</h5>
            <h4 className='weight'>{pokemon?.weight}</h4>
          </div>
          <div>
            <h5 className='height_name'>Height</h5>
            <h4 className='height'>{pokemon?.height}</h4>
          </div>
        </div>

        <div className='pokemon_zise'>
          <div>
            <h3 className='pokemon__type'>Type</h3>
            <div className='pokemon__types'>
              { 
                pokemon?.types.map(type => <div key ={type.type.name}><span className='types'>{type.type.name}</span></div>)
              }
            </div>
          </div>
          <div>
            <h3  className='pokemon__abilitie'>Abilities</h3>
            <div className='pokemon__abilities'>
              {
                pokemon?.abilities.map(ability => <div key = {ability.ability.name}><span className='abilities'>{ability.ability.name}</span></div> )
              }
            </div>
          </div>
        </div>

        <div className='pokemon__stats'>
          <h2 className='pokemon__stats-title'>Stats</h2>
          <section className='pokemon_stats-info'>
            {
              pokemon?.stats.map (stat => (
                <article className='pokemon__stat' key={stat.stat.name}>
                  <div className='pokemon_stat-header'>
                    <h4 className='pokemon_stat-name'>{stat.stat.name}</h4>
                    <h5 className='pokemon_stat-value'>{stat.base_stat} / 255</h5>
                  </div>
                  <div className='pokemon_pokemon-bar'>
                    <div className='pokemon_stat-barGray'>
                      <div className='pokemon_stat-barProgress' style={{width: getPercentBar(stat.base_stat)}}></div>
                    </div>
                  </div>
                </article>
               ))
            }
          </section>
        </div>

      </section>
    </main>
  )
}

export default Pokemon
