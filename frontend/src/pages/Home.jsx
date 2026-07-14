import React from "react";

import HeroCarousel from "../components/HeroCarousel";
import Feedback from "../components/Feedback";
import Features from "../components/Features";
import QueryForm from "../components/QueryForm";
import Overvision from "../components/Overvision";
import About from "./About";


function Home() {
  return (
    <div>
  
      <HeroCarousel/>
    
      <Overvision/>
        <About/>
      <Feedback/>
    
     <QueryForm/>
     



     
    </div>
  );
}

export default Home;
