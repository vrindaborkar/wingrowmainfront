import React , {useState , useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
// import { Link } from 'react-router-dom'


function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  const theme = createTheme();  

const VendorsFeed = () => {

    const [Data, setData] = useState({
        commodity:"",
        quantity:""
      })
    const [vendorsData, setVendorsData] = useState({
        vendorsName:"",
        vendorsMarket:"",
        data:[Data]
    })

    const handleVendorsData = (e)=>{
        const {name , value} = e.target
        setVendorsData(prevState => ({
          ...prevState,
          [name]:value
      }))
      }
      const handleVendor = (e)=>{
        const {name , value} = e.target
        setData(prevState => ({
          ...prevState,
          [name]:value
        }))
      }
      useEffect(() => {
        setVendorsData((prevState)=>({
          ...prevState,
          data:Data
        }))
      }, [Data])
    
    const handleAddData = async(e) =>{
    const {commodity , quantity} = Data
    const {vendorsName , vendorsMarket} = vendorsData
        try {
          if(quantity && commodity &&vendorsName && vendorsMarket)
          {const res = await fetch("/vendorsdata" , {
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body: JSON.stringify({
                 vendorsName:vendorsData.vendorsName.toUpperCase(),
                 vendorsMarket:vendorsData.vendorsMarket.toUpperCase(),
                    data:[{
                    commodity:Data.commodity.toUpperCase(),
                    quantity:Data.quantity
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
              quantity:""
            }
          )
          setVendorsData(
            {
            vendorsName:"",
            vendorsMarket:"",
            data:Data
          }
          )
      }

    const handleSubmit = (event) => {
        event.preventDefault();
      }

    return (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                <b>Vendors Requirements Form</b>
              </Typography>
              <Box component="form" onSubmit={handleSubmit}  noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="vendorsName"
                  label="vendors Name"
                  name="vendorsName"
                  value={vendorsData.vendorsName}
                  autoFocus
                  type="text"
                  onChange={handleVendorsData}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="vendorsMarket"
                  label="vendors Market"
                  name="vendorsMarket"
                  value={vendorsData.vendorsMarket}
                  autoFocus
                  type="text"
                  onChange={handleVendorsData}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="commodity"
                  label="commodity"
                  name="commodity"
                  value={Data.commodity}
                  autoFocus
                  type="text"
                  onChange={handleVendor}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="quantity"
                  label="Quantity in kg"
                  name="quantity"
                  value={Data.quantity}
                  autoFocus
                  type="number"
                  onChange={handleVendor}
                />
                <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleAddData}
            >
              Submit
            </Button>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      );
}

export default VendorsFeed