import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import Features from '../components/Features';
import Overvision from '../components/Overvision';
import Feedback from '../components/Feedback';
import SearchTransportBar from '../Dashboard/user/SearchBar';

function Home() {
  return (
    <div>
      <HeroCarousel />
      <SearchTransportBar/>
     
      <Features />
      <Overvision />
      <Feedback />
    </div>
  );
}

export default Home;