import React from "react";

import HeroCarousel from "../components/HeroCarousel";
import Feedback from "../components/Feedback";
import Features from "../components/Features";
import QueryForm from "../components/QueryForm";
import Overvision from "../components/Overvision";
import About from "./About";
import ReadyToGrow from "./ReadyToGrow";


function Home() {
  return (
    <div>
  
      <HeroCarousel/>
    
      <Overvision/>
        <About/>
         <ReadyToGrow/>
      <Feedback/>
    
     <QueryForm/>
    
     



     
    </div>
  );
}

export default Home;
