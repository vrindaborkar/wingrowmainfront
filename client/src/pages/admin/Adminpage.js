import React from 'react'
import { Link } from 'react-router-dom'
import './Admin.css'

const Adminpage = () => {
  return (
    <div className='admin_main'>
        <Link to={"./stalls"} className="stalls">Stalls</Link>
        <Link to={"./overalldata"} className="overalldata">Overall Data</Link>
        <Link to={"./vendorsdata"} className="vendorsdata">Vendors Data</Link>
    </div>
  )
}

export default Adminpage