import React from "react";
import { TextField,Paper, Typography, Button, Alert,Stack,Box, Radio, Link, RadioGroup, FormControlLabel} from "@mui/material";
import bg from "../images/bg.png"
import "./index.css";
import axios from "axios";
import api from "../api/api";
import { Usercontext } from "../../App";

const useStylesMobile = {
    paper: {
      background: '#FFFFFF',
      border: 0,
      marginLeft: "10px",
      marginTop: 100,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: "30%",
      width: "100px",
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
      width: "50%",
      padding: '0 30px',
    },
    
    textfield:{
      paddingTop: 60
    }
  };

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const data = {
    firstName:"",
    lastName:"",
    email:"",
    phoneNumber:"",
    locationCity:"",
    pincode:"",
    password:"",
    gender:"",
    coOrds:[],
    listOfHobbies:[]
}
const Signup = () => {
    const [userData, updateUserData] = React.useState(data);
    const [error, setError] = React.useState("");
    const {state, dispatch} = React.useContext(Usercontext);

    React.useEffect(()=>{
      navigator.geolocation.getCurrentPosition(position => {
        userData.coOrds[0] = position.coords.latitude;
        userData.coOrds[1] = position.coords.longitude;
      });
    });


    const handleSubmit = async(e) => {
      e.preventDefault();

      const config = {
        header: {
          "Content-Type" : "application/json"
        }
      }
      if(validateDetails()){
        try{
          const {data} = await api.post("/api/auth/register", {...userData}, config);
          dispatch({type:"HOMEPAGE",showLogin:true});
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
      if(userData.firstName==='' || userData.lastName==='' || userData.email ==='' || userData.phoneNumber===''|| userData.password===''|| userData.pincode===''|| userData.gender===''){
        setError('Please Fill All Details');
        return false;
      }if(userData.phoneNumber.length!==10){
        setError('Mobile Number should be 10 digits');
        return false;
      }if(userData.password.length<6){
        setError('Password length should be 6');
        return false;
      }if(!emailRegex.test(userData.email)){
        setError('Enter valid email')
        return false;
      }if(userData.pincode.length!==6){
        setError('Enter a valid PinCode');
        return false;
      }
      if(userData.locationCity===""){
        setError('Please fetch a location using pincode');
        return false;
      }            
      return true;
    }

    const handleLocation = async () => {
      await axios.get(`https://api.postalpincode.in/pincode/${userData.pincode}`).then((res)=>{
        console.log(res)
          let response = res.data[0].PostOffice[0];
          let cityName = response.District;
          updateUserData({...userData, locationCity:cityName});
      }).catch(()=>{
        setError('Invalid Pin code');
      })
    }


    return (<div className="signup-container">
      
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        
        <div className="paper-mobile" style={{marginLeft:"20px",marginRight:"20px",backgroundImage:`url(${require("../images/bg.png")})`}}>
            <Paper style={useStylesMobile} sx={{p: '50px', borderRadius: '24px'}}>
            {error==='' ? '':
              <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert onClose={() => {setError('')}} severity="info">{error}</Alert>
            </Stack>
            
        }
            <form autoComplete="off" noValidate onSubmit={(e)=>handleSubmit(e)}>

                <Typography sx={{fontFamily: 'Cinizel-Bold', fontSize:12}} variant="h6">
                    Register To Find People Of Your Hobbies
                </Typography>           
                <TextField
                name="firstName"
                sx={{marginTop:2}}
                required
                variant="outlined"
                label="First name"
                fullWidth
                value={userData.firstName}
                onChange={(e)=>updateUserData({...userData,firstName:e.target.value})}
                />
                <TextField
                name="lastname"
                sx={{marginTop:2}}
                variant="outlined"
                label="Last name"
                value={userData.lastName}
                onChange={(e)=>updateUserData({...userData,lastName:e.target.value})}
                fullWidth
                />

                <TextField
                name="email"
                type="email"
                sx={{marginTop:2}}
                variant="outlined"
                label="Email"
                value={userData.email}
                onChange={(e)=>updateUserData({...userData,email:e.target.value})}
                fullWidth
                />

                <TextField
                type="number"
                name="phoneNumber"
                sx={{marginTop:2}}
                variant="outlined"
                label="Phone Number"
                fullWidth
                value={userData.phoneNumber}
                onChange={(e)=>updateUserData({...userData,phoneNumber:e.target.value})}
                />

                <TextField
                type="number"
                name="locationCity"
                sx={{marginTop:2}}
                variant="outlined"
                label="Pincode"
                fullWidth
                value={userData.pincode}
                onChange={(e)=>updateUserData({...userData,pincode:e.target.value})}
                />
                <div className="pincode">
                  <TextField
                  type="text"
                  name="locationCity"
                  variant="outlined"
                  inputProps={
                    { readOnly: true, }
                  }
                  label="City"
                  value={userData.locationCity}
                  />
                <Button
                variant="contained"
                sx={{
                    height: 50,
                    marginLeft:"10px"
                }}
                size="large"
                onClick={handleLocation}
                >Fetch</Button>
                </div>
                <TextField
                name="password"
                type="password"
                sx={{marginTop:2, marginBottom:2}}
                variant="outlined"
                label="Password"
                fullWidth
                value={userData.password}
                onChange={(e)=>updateUserData({...userData,password:e.target.value})}
                />
                <RadioGroup row
                sx={{marginBottom:2}}
                aria-label="gender"
                defaultValue="MALE"
                name="row-radio-buttons-group"
                value={userData.gender}
                onChange={(e)=>updateUserData({...userData,gender:e.target.value})}
                >
                <FormControlLabel value="MALE" control={<Radio />} label="Male"  />
                <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
                </RadioGroup>

                <Button
                variant="contained"
                sx={{
                    height: 50
                }}
                size="large"
                type="submit"
                fullWidth 
                onClick={handleSubmit}
                >SignUp</Button>
                <span>Already have an account? <Link style={{cursor:"pointer"}} onClick={()=>dispatch({type:"HOMEPAGE",showLogin:true})}>Login here</Link></span>
        </form>
        </Paper>
        </div>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <div className="paper-pc">
        <Paper style={useStylesPC} sx={{p: '50px', borderRadius: '24px'}}>
        {error==='' ? '':
              <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert onClose={() => {setError('')}} severity="info">{error}</Alert>
            </Stack>
            
        }
            
        <form autoComplete="off" noValidate onSubmit={(e)=>handleSubmit(e)}  >

            <Typography sx={{fontFamily: 'Cinizel-Bold', fontSize:16}} variant="h6">
                Register To Find People Of Your Hobbies
            </Typography>           
            <TextField
            name="firstName"
            required
            sx={{marginTop:2}}
            variant="outlined"
            label="First name"
            fullWidth
            value={userData.firstName}
            onChange={(e)=>updateUserData({...userData,firstName:e.target.value})}
            />
            <TextField
            name="lastname"
            sx={{marginTop:2}}
            variant="outlined"
            label="Last name"
            fullWidth
            value={userData.lastName}
            onChange={(e)=>updateUserData({...userData,lastName:e.target.value})}
            />
            <TextField
            name="email"
            type="email"
            sx={{marginTop:2}}
            variant="outlined"
            label="Email"
            fullWidth
            value={userData.email}
                onChange={(e)=>updateUserData({...userData,email:e.target.value})}
            />
            <TextField
            type="number"
            name="phoneNumber"
            sx={{marginTop:2}}
            variant="outlined"
            label="Phone Number"
            fullWidth
            value={userData.phoneNumber}
            onChange={(e)=>updateUserData({...userData,phoneNumber:e.target.value})}
            />
            <TextField
              type="number"
              name="locationCity"
              variant="outlined"
              sx={{marginTop:2}}
              label="Pincode"
              value={userData.pincode}
              onChange={(e)=>updateUserData({...userData,pincode:e.target.value})}
              fullWidth
              />
            <div className="pincode">
              <TextField
              type="text"
              name="locationCity"
              variant="outlined"
              inputProps={
                { readOnly: true, }
              }
              label="City"
              value={userData.locationCity}
              />
              <Button
              variant="contained"
              sx={{
                  height: 50,
                  marginLeft:"10px"
              }}
              size="large"
              onClick={handleLocation}
              >Fetch</Button>
            </div>
            
            <TextField
            name="password"
            type="password"
            sx={{marginTop:2, marginBottom:2}}
            variant="outlined"
            label="Password"
            fullWidth
            value={userData.password}
            onChange={(e)=>updateUserData({...userData,password:e.target.value})}
            />
            <RadioGroup row
            sx={{marginBottom:2}}
            aria-label="gender"
            defaultValue="MALE"
            name="row-radio-buttons-group"
            value={userData.gender}
            onChange={(e)=>updateUserData({...userData,gender:e.target.value})}
            >
            <FormControlLabel value="MALE" control={<Radio />} label="Male"  />
            <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
            </RadioGroup>

            <Button
            variant="contained"
            sx={{
                height: 50
            }}
            size="large"
            type="submit"
            fullWidth
            >SignUp</Button>
                <span>Already have an account? <Link  style={{cursor:"pointer"}} onClick={()=>dispatch({type:"HOMEPAGE",showLogin:true})}>Login here</Link></span>

            </form>
        </Paper>

        </div>
        <img alt="homepage-image" style={{width: "30%",  height: "20%",marginLeft:"10%", marginRight:"10%"}} src={bg}/>



        
        </Box>
    </div>
    )
}


export default Signup;