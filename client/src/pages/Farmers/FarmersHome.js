import React , {useEffect , useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Farmers.css'

export default function FarmersHome() {
  const navigate = useNavigate()
  const [Data, setData] = useState()
  const [inwardData, setinwardData] = useState()
  const [outwarddata, setoutwardData] = useState()
  

  const getInData = async() =>{
    try {
      fetch('/inward').then((res)=>res.json())
      .then((res)=>{setinwardData(res)})
    } catch (error) {
      console.log(error)
    }
  }

  const getOutData = async() =>{
    try {
      fetch('/outward').then((res)=>res.json())
      .then((res)=>{setoutwardData(res)})
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getInData();
    getOutData();//eslint-disable-next-line
  }, [])
  

  const callInfo = async() =>{
    try {
      const res = await fetch("/info",{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      })

      const data = await res.json();
      setData(data)

      if(!res.status === 200){
        throw new Error(res.error);
      }

    } catch (error) {
      navigate("./")
    }
  }

  useEffect(() => {
    callInfo();//eslint-disable-next-line
  }, [])

  const handlelogoutbtn = async() =>{
    fetch('/logout',{
      method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
    }).then((res)=>{
      alert("logout successful")
      navigate('../',{ replace: true });
      if(res.status !== 200){
        throw new Error(res.error);
      }
    }).catch((err)=>{
      console.log(err)
    })
  }
  console.log(inwardData)
  
  return (
    <div className='main_page_farmers'>
      {(Data)?<div className='farmers_main'>
          <div className='farmers_info'>
            <h1 className='heading_primary'>{
              `Welcome ${Data.fname} ${Data.lname}`
                }
            </h1>
          </div>
          <div className='farmers_data'>
            <div className='inward_data'>
              <h2 className="header_primary">Inward Data</h2>
              <div className='inward_info'>
                {
                  (inwardData)?
                  <div className='inward_details'>
                    {
                      inwardData.filter(e=>e.mobile_num===`${Data.phone}`).map((e)=>{
                        const { data , total_cummulative_purchase ,farmers_market } = e
                        return(<div >
                          <div>
                            Market : {farmers_market}
                          </div>
                          <div>
                            Total Cummulative purchase : {total_cummulative_purchase}
                          </div>
                          {
                            data.map((e,i)=>{
                              return(<div className='purchase_info'>
                                <div>commodity : {e.commodity}</div>
                                <div>purchase rate : {e.purchase_rate}</div>
                                <div>purchase_quantity : {e.purchase_quantity}</div>
                                </div>)
                            })
                          }
                        </div>)
                      })
                    }
                  </div>:
                  <h2>No Inward Data</h2>
                }
              </div>
            </div>


            <div className='outward_data'>
            <h2 className="header_primary">Outward Data</h2>
              <div className='outward_info'>
              {
                  (outwarddata&&outwarddata!==[]&&outwarddata!==undefined)?
                  <div className='outward_details'>
                    {
                      outwarddata.filter(e=>e.mobile_num===`${Data.phone}`).map((e)=>{
                        const {data , total_cummulative_sales,farmers_market} = e
                        return(<div>
                          <div>
                            Market : {farmers_market}
                          </div>
                          <div>
                            Total Cummulative Sales : {total_cummulative_sales}
                          </div>
                          {data.map((e,i)=>{
                            return(<div className='sales_info'>
                                <div>commodity : {e.commodity}</div>
                                <div>sales rate : {e.sales_rate}</div>
                                <div>sales quantity : {e.sales_quantity}</div>
                            </div>)
                          })}
                        </div>)
                      })
                    }
                  </div>:
                  <h2>No Outward Data</h2>
                }
                
              </div>
            </div>
          </div>
          <button className='logout_btn' onClick={handlelogoutbtn}>
            Logout
          </button>
          <div className='buttons'>
            <Link className='button' to={"../outward"}>
                    Fill Outward Data
                </Link>
            <Link className='button' to={"../inward"}>
                  Fill Inward Data
            </Link>
          </div>
          
      </div>:<h2>Loading....</h2>}
      </div>
  );
}









