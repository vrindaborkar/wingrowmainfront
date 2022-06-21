import React , {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';


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

export default function Login() {
  const navigate = useNavigate()
  const [UserLogin, setUserLogin] = useState({
    phone:"",
    password:""
  })

  const handleLogin= (e)=>{
    const {name , value} = e.target
    setUserLogin(prevState => ({
      ...prevState,
      [name]: value
  }))
}

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    if(UserLogin.phone&&UserLogin.password)
    {const res = await fetch("/signin" , {
        method:"POST",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:'include',
        body: JSON.stringify({
            phone:UserLogin.phone,
            password:UserLogin.password
        })
      });
      const data = await res.json()
      if(res.status === 400 || !data){
        alert("Invalid credentials")
        setUserLogin({
          phone:"",
          password:""
        })
      }else{
        alert("Login successful")
        navigate('./farmersHome')
      }
    }
  } catch (error) {
    alert("Login failed")
    console.log(error)
  }
}


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ mt: 10, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            <b>Login</b>
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2, border: 0,padding:"30px",boxShadow:5,backgroundColor:"FFFF99", opacity:0.9}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              value={UserLogin.phone}
              autoComplete="email"
              onChange={handleLogin}
              autoFocus
              type="number"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              onChange={handleLogin}
              label="Password"
              value={UserLogin.passworc}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to={"./register"}>
                  <Button fullWidth
                   variant="contained"
                   sx={{ mt: 3, mb: 2}} 
                   className='button'>
                    Click here to Register
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}