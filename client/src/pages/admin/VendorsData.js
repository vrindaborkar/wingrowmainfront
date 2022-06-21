import React , {useState , useEffect} from "react";
import './Admin.css'

const VendorsData = () => {
    const [vendorsData, setVendorsData] = useState()

    useEffect(() => {
        fetch("/vendors")
        .then((res)=>res.json())
        .then(res=>{
          setVendorsData(res);
        })
      }, [])
      return (
              <div className='vendors_mainfeed'>
                {vendorsData?
               <div className="vendors_feed">
                   {vendorsData.map((e)=>{
                       const { data } = e
                       return(
                           <div className='vendor_data'>
                               <div>Vendors Name : {e.vendorsName}</div>
                               <div>Vendors Market : {e.vendorsMarket}</div>
                               {data.map((e)=>{
                                   return(
                                       <div>
                                           <div>Commodity : {e.commodity}</div>
                                           <div>Quantity : {e.quantity}</div>
                                        </div>
                                   )
                               })}
                           </div>
                       )
                   })}
               </div> :
               <h2>Data Loading....</h2>
            }
            </div>
      );
}

export default VendorsData