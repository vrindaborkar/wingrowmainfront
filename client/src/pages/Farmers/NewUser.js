import React from 'react'
import { Link } from 'react-router-dom'

const NewUser = () => {
  return (
    <div>
        <div>
            <Link to='../inward'>
                Inward
            </Link>
            <Link to='../outward'>
                Outward
            </Link>
        </div>   
    </div>
  )
}

export default NewUser