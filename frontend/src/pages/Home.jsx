import React from "react";
import SearchBar from "../components/SearchBar";
import HeroCarousel from "../components/HeroCarousel";
import Price from "../components/Price";
import Feedback from "../components/Feedback";
import Features from "../components/Features";
import AppFooter from "../components/AppFooter";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div>
      <Navbar/>
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
