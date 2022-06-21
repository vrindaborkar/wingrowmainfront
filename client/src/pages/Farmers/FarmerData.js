import React,{useState , useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        WingrowAgritech
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function FarmerData() {
  const navigate  = useNavigate()
  const [info, setInfo] = useState()
  const [ToggleBtn, setToggleBtn] = useState(false)
  const [Data, setData] = useState({
    commodity:"",
    purchase_quantity:"",
    purchase_rate:"",
    total_purchase:""
  })
  const [farmersData, setFarmersData] = useState({
    farmers_market:"",
    farmer_name :"",
    mobile_num:"",
    data:[Data]
  })


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
      setInfo(data)

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

  useEffect(() => {
    setFarmersData((prevState)=>({
      ...prevState,
      data:Data
    }))
  }, [Data])
  

  
  const handleAddData = async(e) =>{
    const {farmers_market} = farmersData
    const {purchase_quantity , purchase_rate , commodity} = Data
    const mul = purchase_quantity*purchase_rate;

    try {
      if(farmers_market &&  purchase_quantity && purchase_rate && commodity)
      {const res = await fetch("/inward" , {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
              farmers_market:farmersData.farmers_market.toUpperCase(),
              farmer_name:`${info.fname.toUpperCase()} ${info.lname.toUpperCase()}`,
              mobile_num:info.phone,
                data:[{
                commodity:Data.commodity.toUpperCase(),
                purchase_quantity:Data.purchase_quantity,
                purchase_rate:Data.purchase_rate,
                total_purchase:mul
                      }]
          })
        });
        const data = await res.json()
        if(data){
          alert("data added succesfully")
        }else{
          alert("data not added")
        }
      }
    } catch (error) {
      alert("data not added")
      console.log(error)
    }

      setData(
        {
          commodity:"",
          purchase_quantity:"",
          purchase_rate:"",
          total_purchase:"" 
        }
      )
      setFarmersData(
        {farmers_market:"",
        data:Data
      }
      )
  }

  const handleFarmerData = (e)=>{
    const {name , value} = e.target
    setFarmersData(prevState => ({
      ...prevState,
      [name]:value
  }))
  }
  const handleFarmer = (e)=>{
    const {name , value} = e.target
    setData(prevState => ({
      ...prevState,
      [name]:value
    }))
  }

   
  const handleInput=(e)=>{
    if(e.target.value!==""){
      setToggleBtn(true)
    }else{
      setToggleBtn(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <>
    {info?<ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding:"30px",
            overflowX:"hidden"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           Farmer Inward Data!!
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5,border: 0,padding:"30px",boxShadow:5,backgroundColor:"antiquewhite", opacity:0.9 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="farmer_name"
                  value={`${info.fname} ${info.lname}`}
                  required
                  fullWidth
                  type="text"
                  id="farmer_name"
                  label="Farmer Name"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  
                  fullWidth
                  name="mobile_num"
                  label="Mobile Number"
                  value={info.phone}
                  type="number"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="farmers_market"
                  label="Farmers Market"
                  value={farmersData.farmers_market}
                  onChange={handleFarmerData}
                  onInput={handleInput}
                  type="text"
                  id="farmers_market"
                  autoComplete="new-farmers market"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="commodity"
                  value={Data.commodity}
                  onChange={handleFarmer}
                  label="Commodity"
                  type="text"
                  id="commodity"
                  autoComplete="new-commodity"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="purchase_quantity"
                  value={Data.purchase_quantity}
                  onChange={handleFarmer}
                  label="Purchase Quantity"
                  type="number"
                  id="purchase quantity"
                  autoComplete="new-purchase quantity"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="purchase_rate"
                  value={Data.purchase_rate}
                  onChange={handleFarmer}
                  label="Purchase Rate"
                  type="number"
                  id="purchase rate"
                  autoComplete="new-purchase rate"
                />
              </Grid>
            </Grid>
            <Grid>
            {ToggleBtn?<Button
              type="submit"
              variant="contained"
              sx={{ m:2 }}
              onClick={handleAddData}
            >
              Add
            </Button>:<Button
              type="submit"
              disabled
              variant="contained"
              sx={{ m:2 }}
              onClick={handleAddData}
            >
              Add
            </Button>}
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>:<h1>Loading....</h1>}
    </>
  );
}