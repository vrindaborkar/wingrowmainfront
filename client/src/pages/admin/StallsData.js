import React,{useState , useEffect}  from "react";
import './Admin.css'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const StallsData = () => {
    const [Value, setValue] = React.useState('');
    const handleChange = (event) => {
      setValue(event.target.value);
    };

    const [inwardData, setinwardData] = useState([])
  
    useEffect(() => {
      fetch("/inward")
      .then((res)=>res.json())
      .then(res=>{
        setinwardData(res);
      })
    }, [])

  return (
    <div className="farmers_drop_data">
          <Box sx={{width:"50%",margin:5,padding:2}}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Choose Market</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={Value}
              label="Value"
              onChange={handleChange}
            >
              <MenuItem value="HADAPSAR">HADAPSAR</MenuItem>
              <MenuItem value="KARVE NAGAR">KARVE NAGAR</MenuItem>
              <MenuItem value="AMANORA TOWN CITY">AMANORA TOWN CITY</MenuItem>
              <MenuItem value="WANWADI">WANWADI</MenuItem>
              <MenuItem value="PRABHAT ROAD">PRABHAT ROAD</MenuItem>
              <MenuItem value="BRAMHASUN CITY">BRAMHASUN CITY</MenuItem>
              <MenuItem value="KHARADI IT PARK">KHARADI IT PARK</MenuItem>
              <MenuItem value="MAGARPATTA">MAGARPATTA</MenuItem>


            </Select>
          </FormControl>
        </Box>
          <div>
            {(inwardData)?inwardData.filter((e)=>e.farmers_market===Value).map((e , i)=>{
              const { data } = e;
              return(
              <div className="farmer_market" key={i}>
                <div>Farmers Name : {e.farmer_name}</div>
                <div>Farmers Market : {e.farmers_market}</div>
                <div>Farmers Phone No : {e.mobile_num}</div>
                <div>
                Commodities : 
                  {data.map((e,i)=>{
                    return(<div>
                      <div>{e.commodity}</div>
                    </div>)
                  })}
                </div>
              </div>)
            }):<h2>Data Loading....</h2>}
          </div>
          </div>
  )
}

export default StallsData