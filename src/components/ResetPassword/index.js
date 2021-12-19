import React from "react";
import { TextField,Paper,AppBar, Toolbar, Container, Typography, Button, Alert, Stack,Box} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useParams } from "react-router-dom";


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

const pass = {
    password:"",
    confirmPassword:""
}
const ResetPassword = () => {


    const [password, updatePassword] = React.useState(pass);
    const [email, updateEmail] = React.useState("");
    const [error, setError] = React.useState("");
    let { id } = useParams();
    const navigate = useNavigate();

    React.useEffect(async ()=>{
        const config = {
            header: {
                "Content-Type" : "application/json"
            }
            }
        try{
            const {data} = await api.get("/api/auth/getEmailByResetToken/"+id, config);
            updateEmail(data.email);
            return;
        }
        catch(error){
            setError(error.response.data.error+" please retry changing password");
            setTimeout(()=>{
                setError("");
                navigate("/")
            }, 2000)
            return;
        }
    }, [email])
    const handleChangePassword = async(e) => {
        e.preventDefault();
        const config = {
            header: {
                "Content-Type" : "application/json"
            }
            }
        if(password['password'] === password['confirmPassword']){
            try{
                const {data} = await api.post("/api/auth/resetPassword/"+id, {password:password.password}, config);
                console.log(data)
                setError("Password Reset Successful!! Please wait while we redirect to homepage");
                setTimeout(()=>{
                    setError("");
                    navigate("/")
                }, 3000)
            }
            catch(error){
                setError(error.response.data.error+" please retry changing password");
                setTimeout(()=>{
                    setError("");
                }, 5000)
                return;
            }
        }
        else{
            setError("Passwords are not matched")
            setTimeout(()=>{
                setError("");
            })
        }

    }

    return(<>
    <div>
    <AppBar position="static" style={{ mt:40,fontFamily: "Cinizel-Regular", background:"rgba(36, 0, 69, 1)"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            onClick={()=>{navigate("/")}}
            sx={{ cursor:"pointer",fontFamily: "Cinizel-Regular", mr:60, fontSize:"20px", display: { xs: 'none', md: 'flex' }, }}
          >
            <h1 >Hobbinator</h1>
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' },fontFamily:"Cinizel-Regular", fontSize:"20px" }}
          >
            Hobbinator
          </Typography>
          </Toolbar>
          </Container>
          </AppBar>
    </div>
    <div>

    </div>
    <div>
    <Box sx={{ flexGrow: 1, marginTop:"100px", marginLeft:"8%", marginRight:"8%",display: { xs: 'flex', md: 'none' } }}>
        <Paper style={useStylesPC} sx={{p: '50px', borderRadius: '24px', fontSize:9}}>
        {error==='' ? '':
            <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert onClose={() => {setError('')}} severity="info">{error}</Alert>
            </Stack>  
        }
        <Typography sx={{fontFamily: 'Cinizel-Bold', fontSize:14, margin:"5px"}} variant="h6">
        Reset Your Password : {email}
        </Typography>           
        <Typography sx={{fontFamily: 'Cinizel-Bold', fontSize:8, margin:"5px"}} variant="h6">
        Enter your new password
        </Typography> 
        <TextField
            name="password"
            type="password"
            sx={{marginTop:2, marginBottom:"15px"}}
            variant="outlined"
            label="Password"
            fullWidth
            value={password.password}
            onChange={(e)=>updatePassword({...password,password:e.target.value})}
        />
        <TextField
            name="confirm-password"
            type="password"
            sx={{marginTop:2, marginBottom:"15px"}}
            variant="outlined"
            label="Confirm new password"
            fullWidth
            value={password.confirmPassword}
            onChange={(e)=>updatePassword({...password, confirmPassword: e.target.value})}
            />
            <Button
            variant="contained"
            sx={{
                height: 50
            }}
            size="large"
            fullWidth
            onClick={(e)=>handleChangePassword(e)}
            >Change Password</Button> 
        </Paper>
    </Box>
    </div>
    <div>
    <Box sx={{ flexGrow: 1, marginTop:"8%", marginLeft:"35%", marginRight:"35%",fontSize:14,display: { xs: 'none', md: 'flex' } }}>
        <Paper style={useStylesPC} sx={{p: '50px', borderRadius: '24px', fontSize:14}}>
        {error==='' ? '':
            <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert onClose={() => {setError('')}} severity="info">{error}</Alert>
            </Stack>  
        }
        <Typography sx={{fontFamily: 'Cinizel-Bold', fontSize:14, margin:"5px"}} variant="h6">
        Reset Your Password : {email}
        </Typography>           
        <Typography sx={{fontFamily: 'Cinizel-Bold', fontSize:12, margin:"5px"}} variant="h6">
        Enter your new password
        </Typography>  
        <TextField
            name="password"
            type="password"
            sx={{marginTop:2, marginBottom:"15px"}}
            variant="outlined"
            label="New password"
            fullWidth
            value={password.password}
            onChange={(e)=>updatePassword({...password,password:e.target.value})}

        />
        <TextField
            name="confirm-password"
            type="password"
            sx={{marginTop:2, marginBottom:"15px"}}
            variant="outlined"
            label="Confirm new password"
            fullWidth
            value={password.confirmPassword}
            onChange={(e)=>updatePassword({...password, confirmPassword : e.target.value})}
            />
            <Button
            variant="contained"
            sx={{
                height: 50
            }}
            size="large"
            fullWidth
            onClick={(e)=>handleChangePassword(e)}
            >Change Password</Button>
        </Paper>
    </Box>



    </div>
    </>)
}

export default ResetPassword