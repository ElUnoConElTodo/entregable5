import React from 'react'
import { useDispatch } from 'react-redux';
import { setNameTrainerGlobal } from '../store/slices/nameTrainer.slice';
import "./style/Home.css"

const Home = () => {

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        const nameTrainer = e.target.nameTrainer.value
        dispatch(setNameTrainerGlobal(nameTrainer));
    }
  return (
    <main className='home'>
        <section>
            <div className='img'>
                <img src="public/images/pokedex.png" alt="" />
            </div>
            <div className='home_welcome'>
                <h2 className='home_hello'>Hello Trainer!</h2>
                <p>Write your name to start !</p>
                <div className='home_begin'>
                    <form onSubmit={handleSubmit}>
                        <input className='home_imput'
                        required 
                        id='nameTrainer' 
                        type="" 
                        placeholder='Your name...' />
                        <button className='home_btn'>Begin</button>
                    </form>
                </div>
            </div>
        </section>
        <footer>
            <div className='black'></div>
            <div className='pokeball'></div>
            <div className='red'></div>
        </footer>
    </main>
    
  )
}

export default Home