import React from 'react';

function Location() {
    const locations = [
    {
        name:"Amanora Town City",
        day:"Every Sunday",
        // address:"https://goo.gl/maps/jUtyP67Q1oWdDMvA9",
        // address:"Beside Leisure town, Behind Amanora fire station, Sadesatara nali, Hadapsar",
        address:"https://goo.gl/maps/HHMD4DHv7RgUXGj8A",
        time:"3pm-9pm"
    },
    {
        name:"Prabhat Road",
        day:"Sunday",
        address:"https://goo.gl/maps/EiFVVggbQTiTm1n2A",
        time:"7am-1pm"
    },
    {
        name:"Wanwadi",
        day:"Saturday",
        address:"https://maps.app.goo.gl/54qsT1zcGPEv6gMx7",
        time:"3pm-9pm"
    },
    {
        name:"Karvenagar",
        day:"Saturday",
        address:"https://goo.gl/maps/y1LnJPhQwMaqrPTF8",
        time:"3pm-9pm"
    },
    {
        name:"Amanora City",
        day:"Sunday",
        address:"https://goo.gl/maps/jUtyP67Q1oWdDMvA9",
        time:"3pm-9pm"
    },
    {
        name:"Prabhat Road",
        day:"Sunday",
        address:"https://goo.gl/maps/EiFVVggbQTiTm1n2A",
        time:"7am-1pm"
    },
    {
        name:"Wanwadi",
        day:"Saturday",
        address:"https://maps.app.goo.gl/54qsT1zcGPEv6gMx7",
        time:"3pm-9pm"
    },
    {
        name:"Karvenagar",
        day:"Saturday",
        address:"https://goo.gl/maps/y1LnJPhQwMaqrPTF8",
        time:"3pm-9pm"
    },
    {
        name:"Amanora City",
        day:"Sunday",
        address:"https://goo.gl/maps/jUtyP67Q1oWdDMvA9",
        time:"3pm-9pm"
    },
    {
        name:"Prabhat Road",
        day:"Sunday",
        address:"https://goo.gl/maps/EiFVVggbQTiTm1n2A",
        time:"7am-1pm"
    },
    {
        name:"Wanwadi",
        day:"Saturday",
        address:"https://maps.app.goo.gl/54qsT1zcGPEv6gMx7",
        time:"3pm-9pm"
    },
    {
        name:"Hinjewadi",
        day:"Saturday",
        address:"https://goo.gl/maps/y1LnJPhQwMaqrPTF8",
        time:"3pm-9pm"
    }
]
  return <>
      {
          locations.map((e,i)=>{
            const {name,address,time,day} = e;
            return(
                <div key={i} className='location'>
                    <a style={{color:"black"}} href={address}>
                    <img className='location_img' src="https://tse1.mm.bing.net/th?id=OIP.bpW3ZINuqTgSZpZQj_Th2wHaHa&pid=Api&P=0&w=168&h=168" alt="logo" />
                    </a>
                    <div>
                        <h1 style={{textAlign:"center",fontWeight:"700",padding:".5rem",margin:".5rem"}}>{name}</h1>
                        <h2 style={{textAlign:"center",fontWeight:"700"}}>Day : {day}</h2>
                        <h2 style={{textAlign:"center",fontWeight:"700"}}>Time : {time}</h2>
                    </div>
                    
                </div>
            )
          })
      }

  </>;
}

export default Location;
