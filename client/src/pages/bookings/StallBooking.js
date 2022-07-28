import React , {useState , useEffect} from 'react'
import './stallbooking.css'
import './Bookings.css'
import Dropdown from './Dropdown'
import Seats from './Seats'
import axios from 'axios'

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
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);

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
    const orderUrl = "/orders";
    const {data} = await axios.post(orderUrl,{amount:100})
    initPayment(data.data)
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


// const initPayment = (data) => {
//   let bookedStats = bookedStalls.toString()
//      const options = { 
//       key:process.env.KEY_ID,
//       amount:data.amount,
//       currency:data.currency,
//       order_id:data.id,
//       bookedSeats:bookedStats,
//       description:"Wingrow Agritech",
//       handler:async(response) =>{
//         try {
//             const verifyUrl = "/verify";
//             const {data} = await axios.post(verifyUrl,response)
//             console.log(data)
//         } catch (error) {
//             console.log(error)
//         }
//     },
//     theme:{
//         color:"#3399cc"
//     }
//    };
//      const rzp = new window.Razorpay(options);
//       rzp.open();
//}



const initPayment = (data) => 
{
  let bookedStats = bookedStalls.toString()
     const options = { 
      key:process.env.KEY_ID,
      amount:data.amount,
      currency:data.currency,
      order_id:data.id,
      bookedStalls:bookedStats,
      description:"Wingrow Agritech",

      
      handler:async(response) =>{
          try {
              const verifyUrl = "/verify";
              const {data} = await axios.post(verifyUrl,response)
              console.log(data)
          } catch (error) {
              console.log(error)
              setBookedStalls([])
              setNumberOfSeats(0)
          }
      },
      theme:{
          color:"#3399cc"
      }
     };
     const rzp = new window.Razorpay(options);
      rzp.open();
  } 


  const handleClick = (e) =>
  {
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
                {(Id!=="")?
                <Seats values={Stalls}
                availableSeats={availableStalls}
                bookedSeats={bookedStalls}
                addSeat={addSeat}/>:
                <h2 style={{margin:"4rem",padding:"2rem"}}>Please select the market</h2>}
                <button onClick={confirmBooking}>Book Stalls</button>
                </div></>:<h2>Loading..</h2>}
    </div>
  )
}

export default StallBooking



            