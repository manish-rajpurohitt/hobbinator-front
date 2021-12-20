import React from 'react'
import { Avatar, Card,Chip, CardContent, CardActions,Divider,ListItemAvatar, Paper,List, ListItemButton,ListItemText,Demo, Typography,Grid, Button,ListItem, Alert,Stack,Box, Radio, Link, RadioGroup, FormControlLabel} from "@mui/material";
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
const useStylesPC = {
    paper: {
      background: '#FFFFFF',
      border: 0,
      color: 'white',
      padding: '0 30px',
    },
    
    textfield:{
      paddingTop: 60
    }
  };

  const mapStyles = {        
    height: "60%",
    width: "100%"
  };
  const useStylesMobile = {
    paper: {
      background: '#FFFFFF',
      border: 0,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      width: "40%",
      padding: '0 30px',
    },
    
    textfield:{
      paddingTop: 60
    }
  };
  

const data = {
    users:[
        {
            displayName: "Manish",
            listOfHobbies:["Cricket", "Football", "gym"],
            email:"manish@gmail.com",
            gender: "MALE",
            phoneNumber:"2222222222",
            coOrds: [9.343, 18.443],
            locationCity:"Hyderabad"
        },
        {
            displayName: "Manish3",
            listOfHobbies:["Cricket", "Football", "gym"],
            email:"manish3@gmail.com",
            gender: "MALE",
            phoneNumber:"2222222222",
            coOrds: [3.343, 2.443],
            locationCity:"Hyderabad"

        },
        {
            displayName: "Manish4",
            listOfHobbies:["Cricket", "Football", "gym"],
            email:"manish4@gmail.com",
            gender: "MALE",
            phoneNumber:"333333333",
            coOrds: [11.343, 15.443],
            locationCity:"Hyderabad"

        },
        {
            displayName: "Manish5",
            listOfHobbies:["Cricket", "Football", "gym"],
            email:"manish5@gmail.com",
            gender: "FEMALE",
            phoneNumber:"2222222222",
            coOrds: [9.343, 10.443],
            locationCity:"Hyderabad"

        },
        {
            displayName: "Manish4",
            listOfHobbies:["Cricket", "Football", "gym"],
            email:"manish@gmail.com",
            gender: "MALE",
            phoneNumber:"2222222222",
            coOrds: [11.343, 10.443],
            locationCity:"Hyderabad"

        },
        {
            displayName: "Manish4",
            listOfHobbies:["Cricket", "Football", "gym"],
            email:"manish@gmail.com",
            gender: "MALE",
            phoneNumber:"2222222222",
            coOrds: [7.343, 15.443],
            locationCity:"Hyderabad"

        }
    ]
}
function DashboardMobile() {

    const [error, setError] = React.useState("");
    const [selectedUser, updateSelectedUser] = React.useState();
    const [defaultCenter, updateDefaultCenter] = React.useState({lat:0.00, lng:0.00});
    const [usersList, updateUsersList] = React.useState([]);
    const [user, updateUser] = React.useState({
    });
    const navigate = useNavigate();
    React.useEffect(()=>{

        const config = {
            headers: {
              "Content-Type" : "application/json",
              Authorization : `Bearer ${localStorage.getItem("authToken")}`
            }
          }
        const fetchData = async ()=>{
        
        try{
            const {data} = await api.get("/api/user/getUserById/"+localStorage.getItem("userId"), config);
            updateUser(data);
          }
          catch(error){
            setError(error.response.data.error);
            setTimeout(()=>{
                setError("");
                localStorage.removeItem("authToken");
                localStorage.removeItem("userId");
                navigate("/");
            }, 5000)
            return;
          }
        };
        fetchData();
        const fetchUsersWithHobbies = async () => {
            try{
                const {data} = await api.get("/api/user/fetchUserWithHobbiesAndLocation", config);
                updateUsersList(data.listOfUsers);
              }
              catch(error){
                  console.log();
                setError(error.response.data.error);
                setTimeout(()=>{
                    setError("");
                }, 5000)
                return;
              }
        }
        fetchUsersWithHobbies();
        }, []);
    return (
        <div style={{display:"flex", flexDirection:"column", width:"95%",margin:"2px", height:"100px"}}>
            <div style={{ width:"100%",height:"800px", marginTop:"20px" }}>
            { (usersList.length !== 0)?
                <Paper style={useStylesMobile} sx={{p: '30px',marginLeft:"15px",height:"75%",width:"80%", borderRadius: '24px'}}>
                <Typography sx={{marginBottom:2,fontFamily: 'Cinizel-Bold'}} variant="h6">
                        List of users with similar hobbies and location
                    </Typography>
                    {error==='' ? '':
                        <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert onClose={() => {setError('')}} severity="info">{error}</Alert>
                        </Stack>   
                    }
                    <div style={{height:"80%",overflowY:"scroll", width:"100%"}}>
                    
                        {usersList.map((user,index)=>{
                            return(
                                <div key={index} style={{display:"flex", width:"100%"}} >
                                    <img height="20%" width="20%" style={{margin:"5px", borderRadius:"15px"}} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"/>
                                <Card key={index} href="#userDetails" onClick={()=>{updateSelectedUser(user); updateDefaultCenter({lat:user.coOrds[0],lng:user.coOrds[1]})}} sx={{ width:"100%", cursor:"pointer",borderRadius:"15px", margin:"5px" }}>
                                <CardContent key={index}>
                                    <Typography  gutterBottom variant="h5" component="div">
                                    {user.displayName}
                                    </Typography>
                                    <Typography gutterBottom variant="body2" color="text.secondary">
                                        {user.gender}
                                    </Typography>
                                    <Typography gutterBottom variant="body2" color="text.secondary">
                                        {user.locationCity}
                                    </Typography>
                                </CardContent>
                                </Card>
                                </div>
                            )
                        })
                    }
                    </div>
                <div>
                </div>  
                </Paper>
                : <><Paper style={useStylesMobile} sx={{p: '30px',marginLeft:"15px",height:"50%",width:"200px", borderRadius: '24px'}}>
                <Typography sx={{marginBottom:2,fontFamily: 'Cinizel-Bold', fontSize:12}} variant="h6">
                        Please add atleast one hobby from profile section <Link onClick={()=>navigate("/profile")}>here</Link>
                </Typography>
                </Paper>
                    </>
            }
            </div>
            { selectedUser?
            <div id="userDetails">
            <Paper style={useStylesMobile} sx={{p: '30px',marginBottom:"15px",marginLeft:"15px",width:"80%", borderRadius: '24px'}}>
                    <Typography sx={{marginBottom:2,fontFamily: 'Cinizel-Bold', fontSize:12}} variant="h6">
                        User Details:
                    </Typography>
                    {error==='' ? '':
                        <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert onClose={() => {setError('')}} severity="info">{error}</Alert>
                        </Stack>   
                    }
                       
                    <div style={{height:"100%", display:"flex",width:"100%", flexWrap:"wrap"}}>
                        <img height="25%" width="25%" style={{margin:"2px", borderRadius:"5px"}} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"/>
                        <div>
                            <Typography sx={{fontFamily: 'Cinizel-Bold', fontSize:12,margin:"2px"}} variant="h6">
                             Name: <span>{selectedUser.displayName}</span>
                            </Typography>
                            <Typography sx={{fontFamily: 'Cinizel-Bold', fontSize:12,margin:"2px"}} variant="h6">
                             Gender: <span>{selectedUser.gender}</span>
                            </Typography>
                            <Typography sx={{fontFamily: 'Cinizel-Bold', fontSize:12,margin:"2px"}} variant="h6">
                             Email: <span>{selectedUser.email}</span>
                            </Typography>
                            <Typography sx={{fontFamily: 'Cinizel-Bold', fontSize:12,margin:"2px"}} variant="h6">
                             Phone: <span>{selectedUser.phoneNumber}</span>
                            </Typography>
                            <Typography sx={{fontFamily: 'Cinizel-Bold', fontSize:12,margin:"2px"}} variant="h6">
                             Location: <span>{selectedUser.locationCity}</span>
                            </Typography>
                            <Typography sx={{fontFamily: 'Cinizel-Bold', fontSize:12,margin:"2px"}} variant="h6">
                            Hobbies: {selectedUser.listOfHobbies.map(hobby=><Chip key={hobby.hobbyId} label={hobby.hobbyName}></Chip> )}
                            </Typography>

                           
                        </div>
                        

                    </div>
                   
                </Paper>
            </div>
            :""}

        </div>
    )
}

export default DashboardMobile
