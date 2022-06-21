import React from 'react'
import { Route, Routes } from "react-router-dom";
import StallBooking from './StallBooking'
import './Bookings.css'
import VendorsFeed from './VendorsFeed'
import Bookinghomepage from './Bookinghomepage';

const Bookings = () => {
  return (
    <Routes>
        <Route exact path="/" element={<Bookinghomepage/>}/>
        <Route exact path="/vendorsfeed" element={<VendorsFeed/>}/>
        <Route path="/bookingstall" element={<StallBooking/>}/>
    </Routes>
  )
}

export default Bookings