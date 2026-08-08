import React from 'react'


import Dashboard from '../../pages/dashboardpage/Dashboard'
import Profile from '../Profile'
import ReviewSection from '../ReviewSection'

function TranspoterDashboard() {
  return (
    <div>
      <Profile/>
      <Dashboard/>
      <ReviewSection/>
    </div>
  )
}

export default TranspoterDashboard