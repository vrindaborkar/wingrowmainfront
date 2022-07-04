import React , {useState , useEffect} from 'react'
import './stallbooking.css'
import './Bookings.css'
import Dropdown from './Dropdown'
import Seats from './Seats'

const StallBooking = () => {
const [Id, setId] = useState("")
const [Stalls , setStalls] = useState([])
const [availableStalls , setAvailableStalls] = useState([])
const [bookedStalls , setBookedStalls] = useState([])
const [numberOfSeats, setNumberOfSeats] = useState(0);
const [stallsdata, setStallsData] = useState([]);


const fetchStalls = async () => {
  fetch('/stalls',{
    method:"GET",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json"
    },
    }).then((res)=>res.json())
    .then((res)=>{
      setStallsData(res)
    })
    .catch(err=>console.log(err))
}

  useEffect(() => {
    fetchStalls()
  },[])


  useEffect(() => {
    const updata = availableStalls.filter(function(obj) { return bookedStalls.indexOf(obj) === -1; });
    setAvailableStalls(updata)//eslint-disable-next-line
  }, [bookedStalls]);

useEffect(() => {
  const temp = stallsdata.find(e=>e.location===Id)
    if(temp)
    {setAvailableStalls(temp.availablestalls)
    setStalls(temp.stalls)
  }
}, [stallsdata , Id])


const confirmBooking = async() => {
  try {
    const res = await fetch("/stalls" , {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
              location:Id,
              availablestalls:availableStalls,
              stalls:Stalls
          })
        });
        const data = await res.json()
        if(data){
          setBookedStalls([]);
          setNumberOfSeats(0);
          alert(`Seats Booked :${[...bookedStalls]}`)
        }else{
          alert("data not added")
        }
  } catch (error) {
    console.log(error)
  }
};

const addSeat = async(ev) => {
  if(numberOfSeats && !ev.target.className.includes('disabled')) {
      const seatsToBook = parseInt(numberOfSeats, 10);
    if(bookedStalls.length <= seatsToBook) {
        if (bookedStalls.includes(ev.target.innerText)) {
            const newAvailable = bookedStalls.filter(seat => seat !== ev.target.innerText);
            setBookedStalls(newAvailable);
        } else if(bookedStalls.length < numberOfSeats) {
            setBookedStalls([...bookedStalls, ev.target.innerText]);
        } else if (bookedStalls.length === seatsToBook) {
            bookedStalls.shift();
            setBookedStalls([...bookedStalls, ev.target.innerText]);
        }
    }
  }
};



  const handleClick = (e) =>{
    setId(e.target.innerText)
    fetchStalls()
  }

  return (
    <div className='main_stall'>
        {(stallsdata)?
        <>
        <div className="dropdown">
          <Dropdown Data={stallsdata} handleClick={handleClick}/>
        </div>
        <div>
          <p>How Many Stalls Would You Like to Book?</p>
          <input value={numberOfSeats} onChange={(ev) => setNumberOfSeats(ev.target.value)}/>
                  {(Id!=="")?<Seats values={Stalls}
                   availableSeats={availableStalls}
                   bookedSeats={bookedStalls}
                   addSeat={addSeat}/>:
                   <h2 style={{margin:"auto",padding:"2rem"}}>Please select the market</h2>}
                   <button onClick={confirmBooking}>Book Stalls</button>
        </div></>:<h2>Loading..</h2>}
    </div>
  )
}

export default StallBooking



            