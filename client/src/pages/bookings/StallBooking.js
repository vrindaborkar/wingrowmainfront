import React , {useState , useEffect} from 'react'
import './stallbooking.css'
// import './Bookings.css'
import Dropdown from './Dropdown'
import BookMySeats from './BookMySeats';

const StallBooking = () => {

const [Data, setData] = useState([])
const [Id, setId] = useState("")
const [response, setresponse] = useState()
  
useEffect(() => {
  fetch('/stalls',{
      method:"GET",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      },
  }).then((res)=>res.json())
  .then((res)=>{setData(res)})
  .catch(err=>console.log(err))
}, [])

useEffect(() => {
  const temp = Data.filter(e=>e.location===Id)
  temp.forEach((e)=>{
    setresponse(e)
  })
}, [Data , Id])


  const handleClick = (e) =>{
    setId(e.target.innerText)
  }

  return (
    <div className='main_stall'>
        <div className="dropdown">
                <Dropdown Data={Data} handleClick={handleClick}/>
                </div>
        <div className='stall_content'>
          {(response)?<BookMySeats response={response}/>:<h2>Select Market</h2>}
        </div>
    </div>
  )
}

export default StallBooking



            