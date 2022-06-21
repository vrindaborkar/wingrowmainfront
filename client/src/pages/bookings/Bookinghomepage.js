import React from 'react'
import { Link } from 'react-router-dom'
// import './stallbookings.css'
import './Bookings.css'

const Bookinghomepage = () => {
  return (
    <div className='bookings_main'>
        <Link to={'./vendorsfeed'}className="vendor_form">Vendor's Requirement</Link>
        <br/>
        <Link to={'./bookingstall'}className="book_stall">Book Stall</Link>
    </div>
  )
}

export default Bookinghomepage

// style={{marginTop:"13vh" , fontSize:"1.5rem"}}