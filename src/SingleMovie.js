import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { API_URL } from './Context'
import { NavLink } from 'react-router-dom'

const SingleMovie = () => {
  const {id} = useParams()
  const [isLoading, setIsLoading] = useState(true);
  const[isError,setisError] = useState({show:false , msg:""})
  const[movie,setMovie] = useState("");

const getMovies = async(url)=>{
    try {
        const res = await fetch(url);
        const data = await res.json()
        console.log(data);
        if(data.Response === "True"){
            setIsLoading(false);
            setMovie(data)  
           
        }else{
            setisError({
                show:true,
                msg:data.Error
            })
        }
    }catch(error){
        console.log(error)
    }
}
//debounce
useEffect(() => {
   let timerout =  setTimeout(()=>{
      getMovies(`${API_URL}&i=${id}`)
    },1000);

  return()=>clearTimeout(timerout);

}, [id])


if(isLoading){
  return(
    <div className='movie-section'>
      <div className='loading'>Loading...</div>
    </div>
  )
}
  return <>
  <div className='movie-section'>
   <div className='movie-card'>
    <figure>
      <img src={movie.Poster} alt=""/>
    </figure>


    <div className='card-content'>
      <p className='title'>{movie.Title}</p>
      <p className=''></p>
      <p className='card-text'>{movie.Released}</p>
      <p className='card-text'>{movie.Genre}</p>
      <p className='card-text'>{movie.imdbRating}</p>
      <p className='card-text'>{movie.Country}</p>
       <NavLink to= "/" className="back-btn">Go Back</NavLink>
    </div>
   </div>
  </div>
  
  </>
}

export default SingleMovie