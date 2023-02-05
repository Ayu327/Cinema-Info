
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css";
import Home from "./Home";

import Error from "./Error";
import SingleMovie from "./SingleMovie";
import Movies from "./Movies";






const App = () => {
  return (
    <>
    <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path="movie/:id" element={<SingleMovie/>}/>
    <Route path="*" element ={<Error/>}/>
    <Route path="/movie" element={<Movies/>}/>

  


    
  
  
  </Routes>
  </BrowserRouter>
    </>
  );
};

export default App;