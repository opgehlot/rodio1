import React from 'react'
import SearchBar from '../../components/SearchBar'
import HeroCarousel from '../../components/HeroCarousel'
import Directorydata from '../Directory/Directorydata'
import Navbar from '../../components/Navbar'

function UserDashboard() {
  return (
    <div>
        <h1>hello i am user navbar </h1>
         <Navbar/>
        <Directorydata/>
      
       
    </div>
  )
}

export default UserDashboard