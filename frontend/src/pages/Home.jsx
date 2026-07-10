import React from "react";
import SearchBar from "../components/SearchBar";
import HeroCarousel from "../components/HeroCarousel";
import Price from "../components/Price";
import Feedback from "../components/Feedback";
import Features from "../components/Features";
import AppFooter from "../components/AppFooter";


function Home() {
  return (
    <div>
  
      <HeroCarousel/>
      <SearchBar/>
      <Price/>
      <Feedback/>
     <Features/>
     <AppFooter/>



     
    </div>
  );
}

export default Home;
