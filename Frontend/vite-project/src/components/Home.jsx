import React from 'react'
import  {Link}  from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-screen w-screen bg-zinc-800 flex flex-col justify-center items-center">
    <h1 className="text-zinc-200 font-semibold text-8xl tracking-tighter text-center mb-8">
        Welcome To The Page
    </h1>

   <Link to="/All">
    <button className="bg-zinc-400 text-4xl text-zinc-600 font-bold py-6 px-6 rounded-3xl hover:text-zinc-700">

        Get Dishes <i className="ri-restaurant-line"></i>
    </button>
   </Link>
</div>

  )
}

export default Home
