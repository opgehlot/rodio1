import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import Features from '../components/Features';
import Overvision from '../components/Overvision';
import Feedback from '../components/Feedback';
import SearchTransportBar from '../Dashboard/user/SearchBar';
import QueryForm from '../components/QueryForm';

function Home() {
  return (
    <div>
      <HeroCarousel />
      <SearchTransportBar/>
     
      <Features />
      <Overvision />
      <Feedback />
      <QueryForm/>
    </div>
  );
}

export default Home;