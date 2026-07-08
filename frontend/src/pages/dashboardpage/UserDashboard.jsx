import React from 'react'
import UserNavbar from '../../components/ProtectedNavbar/UserNavbar'
import SearchBar from '../../components/SearchBar'
import HeroCarousel from '../../components/HeroCarousel'
import Directorydata from '../Directory/Directorydata'

function UserDashboard() {
  return (
    <div>
        <h1>hello i am user navbar </h1>
        <UserNavbar/>
        <Directorydata/>
      
       
    </div>
  )
}

export default UserDashboard