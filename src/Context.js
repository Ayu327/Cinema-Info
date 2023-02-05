import React, { useState } from "react"
import { useContext , useEffect } from "react"
export const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`

const AppContext = React.createContext()


const AppProvider = ({children})=>{

const [isLoading, setIsLoading] = useState(true);
const[movie,setMovie] = useState([]);
const[isError,setisError] = useState({show:false , msg:""})
const [query,setQuery] = useState("titanic")
const getMovies = async(url)=>{
    setIsLoading(true)
    try {
        const res = await fetch(url);
        const data = await res.json()
        console.log(data);
        if(data.Response === "True"){
            setIsLoading(false);
            setisError({
                show:false,
                msg:""
            })
            setMovie(data.Search)  
           
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
      getMovies(`${API_URL}&s=${query}`)
    },1000);

  return()=>clearTimeout(timerout);

}, [query])


    return <AppContext.Provider value={{isLoading,isError,movie,query,setQuery}}>
        {children}
    </AppContext.Provider>
}


//custom Global Hook
const useGlobalContext = ()=>{
    return useContext(AppContext)
}
export {AppContext, AppProvider , useGlobalContext};