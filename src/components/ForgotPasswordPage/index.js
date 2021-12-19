import React from "react";
import Navbar from "../Navbar";
import { TextField,Paper, Typography, Button, Alert, Stack,Box, Link} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { color } from "@mui/system";



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

  const emailRegex= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, updateEmail] = React.useState("");
    const [error, setError] = React.useState("");
    
    const gotoHomepage = () =>{
        navigate("/")
    }

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        const config = {
            header: {
              "Content-Type" : "application/json"
            }
          }
          if(validateDetails()){
            try{
              const {data} = await api.post("/api/auth/forgotPassword", {email}, config);
              setError("Password reset link has been sent to your email.");
              setTimeout(()=>{
                setError("");
                navigate("/")
              }, 2000);
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

    const validateDetails = () => {
        if(!emailRegex.test(email)){
            setError('Enter valid email')
            return false;
          }
    
          return true
    }

    React.useEffect(()=>{
        if(localStorage.getItem("authToken"))
        navigate("/")
    })
    return (<>
            <div>
                <Navbar/>
            </div>
            <div>
            <Button
              variant="contained"
              sx={{
                  marginTop:"5%",
                  marginLeft:"5%",
                  backgroundColor:"rgba(36, 20, 80, 40)",
              }}
              size="large"
              type="submit"
              onClick={()=>gotoHomepage()}
              >Go Back Home</Button>
              </div>
            <div className="forgot-password-mobile">
                <Box sx={{ flexGrow: 1, marginTop:"100px", marginLeft:"10px", marginRight:"10px",display: { xs: 'flex', md: 'none' } }}>
                    <Paper style={useStylesPC} sx={{p: '50px', borderRadius: '24px', fontSize:9}}>
                    {error==='' ? '':
              <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert onClose={() => {setError('')}} severity="info">{error}</Alert>
            </Stack>
            
        }
                    <Typography sx={{fontFamily: 'Cinizel-Bold', fontSize:11, margin:"5px"}} variant="h6">
                    Password Assistance
                    </Typography>           
                    <Typography sx={{fontFamily: 'Cinizel-Bold', fontSize:11, margin:"5px"}} variant="h6">
                    Enter the email address associated with your Hobbinator account
                    </Typography>
                        <TextField
                        name="email"
                        type="email"
                        sx={{marginTop:2, marginBottom:"15px"}}
                        variant="outlined"
                        label="Email"
                        fullWidth
                        value={email}
                        onChange={(e)=>updateEmail(e.target.value)}
                        />
                        <Button
                        variant="contained"
                        sx={{
                            height: 50
                        }}
                        size="large"
                        type="submit"
                        fullWidth
                        onClick={(e)=>handleForgotPassword(e)}
                        >Continue</Button>                        
                    </Paper>
                </Box>

            </div>
            <div className="forgot-password-pc">
                <Box sx={{ flexGrow: 1, marginTop:"100px", marginLeft:"100px", display: { xs: 'none', md: 'flex' } }}>
                    <Paper style={useStylesPC} sx={{p: '50px', borderRadius: '24px', fontSize:15}}>
                    <Typography sx={{fontFamily: 'Cinizel-Bold', fontSize:18, margin:"5px"}} variant="h6">
                    Password Assistance
                    </Typography>           
                    <Typography sx={{fontFamily: 'Cinizel-Bold', fontSize:15, margin:"5px"}} variant="h6">
                    Enter the email address associated with your Hobbinator account
                    </Typography>
                        <TextField
                        name="email"
                        type="email"
                        sx={{marginTop:2, marginBottom:"15px"}}
                        variant="outlined"
                        label="Email"
                        fullWidth
                        value={email}
                        onChange={(e)=>updateEmail(e.target.value)}
                        />
                        <Button
                        variant="contained"
                        sx={{
                            height: 50
                        }}
                        size="large"
                        type="submit"
                        fullWidth
                        onClick={(e)=>handleForgotPassword(e)}
                        >Continue</Button>
                    </Paper>
                </Box>

            </div>
    
    </>)
}


export default ForgotPassword;