import React from "react";
import Navbar from "../Navbar";
import { Usercontext } from "../../App";
import { TextField,Paper, Typography,Stack, Alert, Button, Box, Link} from "@mui/material";
import bg from "../images/bg.png"
import "./index.css";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const useStylesMobile = {
    paper: {
      background: '#FFFFFF',
      border: 0,
      marginLeft: "10px",
      marginTop: 100,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: "40%",
      width: "40%",
      padding: '0 30px',
    },
    
    textfield:{
      paddingTop: 60
    }
  };

  const useStylesPC = {
    paper: {
      background: '#FFFFFF',
      border: 0,
      marginLeft: 100,
      marginTop: 100,
      color: 'white',
      height: "30%",
      width: "100px",
      padding: '0 30px',
    },
    
    textfield:{
      paddingTop: 60
    }
  };

  const userdata = {
    email : "",
    password: ""
  }

  const emailRegex= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const Login = () =>{

    const {state, dispatch} = React.useContext(Usercontext);
    const [userData, updateUserData] = React.useState(userdata);
    const [error, setError] = React.useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
      e.preventDefault();

      const config = {
        header: {
          "Content-Type" : "application/json"
        }
      }
      if(validateDetails()){
        try{
          const {data} = await api.post("/api/auth/login", {...userData}, config);
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("userId", data.user._id);
          dispatch({type:"AUTH",loginState:true});
          navigate("dashboard")
        }
        catch(error){
          setError(error.response.data.error);
          setTimeout(()=>{
              setError("");
          }, 5000)
          return;
        }
      }
      else
        return;
      
    }

    const validateDetails = () =>{
      if(userData.email ==='' || userData.password===''){
        setError('Please Fill All Details');
        return false;
      }if(userData.password.length<6){
        setError('Password length should be greater than 6');
        return false;
      }if(!emailRegex.test(userData.email)){
        setError('Enter valid email')
        return false;
      }

      return true
    }

    React.useEffect(()=>{
      if(localStorage.getItem("authToken")){
        dispatch({type:"AUTH", loginState:true})
        dispatch({type:"HOMEPAGE", showLogin:false})
        navigate("/dashboard")
      }
    })

    return (<div className="login-container">
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <div className="paper-mobile" style={{marginLeft:"20px",marginRight:"20px",fontSize:14}}>
            <Paper style={useStylesMobile} sx={{p: '50px', borderRadius: '24px'}}>
            {error==='' ? '':
              <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert onClose={() => {setError('')}} severity="info">{error}</Alert>
            </Stack>
            
        }
                <form autoComplete="off" noValidate onSubmit={(e)=>handleSubmit(e)}>
                <Typography sx={{fontFamily: 'Cinizel-Bold', fontSize:11}} variant="h6">
                    Login To Find People Of Your Hobbies
                </Typography>           

                <TextField
                name="email"
                type="email"
                sx={{marginTop:2}}
                variant="outlined"
                label="Email"
                fullWidth 
                value={userData.email}
                onChange={(e)=>updateUserData({...userData, email:e.target.value})}
                />
                <TextField
                name="password"
                type="password"
                sx={{marginTop:2, marginBottom:2}}
                variant="outlined"
                label="Password"
                fullWidth
                value={userData.password}
                onChange={(e)=>updateUserData({...userData, password:e.target.value})}
                />
                <Link style={{cursor:"pointer"}}  href="/forgotPassword">Forgot Password?</Link>
                <Button
                variant="contained"
                sx={{
                    height: 50 
                }}
                size="large"
                type="submit"
                fullWidth
                >Login</Button>
                <span>Don't have an account? <Link style={{cursor:"pointer"}} onClick={()=>dispatch({type:"HOMEPAGE",showLogin:false})}>Register here</Link></span>
                </form>
            </Paper>
        </div>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <div className="paper-pc">
        <Paper style={useStylesPC} sx={{p: '50px', borderRadius: '24px', fontSize:18}}>

        {error==='' ? '':
              <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert onClose={() => {setError('')}} severity="info">{error}</Alert>
            </Stack>
            
        }
                <form autoComplete="off" style={{marginTop:"10px"}} noValidate onSubmit={(e)=>handleSubmit(e)}>
                <Typography sx={{fontFamily: 'Cinizel-Bold', fontSize:18}} variant="h6">
                    Login To Find People Of Your Hobbies
                </Typography>           

                <TextField
                name="email"
                type="email"
                sx={{marginTop:2}}
                variant="outlined"
                label="Email"
                fullWidth
                value={userData.email}
                onChange={(e)=>updateUserData({...userData, email:e.target.value})}
                />
                <TextField
                name="password"
                type="password"
                sx={{marginTop:2, marginBottom:2}}
                variant="outlined"
                label="Password"
                fullWidth
                value={userData.password}
                onChange={(e)=>updateUserData({...userData, password:e.target.value})}
                />
                <Link style={{cursor:"pointer", margin:"5px"}} href="/forgotPassword">Forgot Password?</Link>
                <Button
                variant="contained"
                sx={{
                    height: 50,
                    marginTop:"10px"
                }}
                size="large"
                type="submit"
                fullWidth
                >Login</Button>
              <span>Don't have an account? <Link style={{cursor:"pointer"}} onClick={()=>dispatch({type:"HOMEPAGE",showLogin:false})}>Register here</Link></span>

                </form>
            </Paper>
        </div>

            <img alt="homepage-image" style={{width: "30%",  height: "20%",marginLeft:"10%", marginRight:"10%"}} src={bg}/>

        
        </Box>
    </div>
    )
}

export default Login;