import React from 'react'
import { Avatar, Card, CardContent, CardActions,Divider,ListItemAvatar, Paper,List, ListItemButton,ListItemText,Demo, Typography,Grid, Button,ListItem, Alert,Stack,Box, Radio, Link, RadioGroup, FormControlLabel} from "@mui/material";
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

  

// const data = {
//     users:[
//         {
//             displayName: "Manish",
//             listOfHobbies:["Cricket", "Football", "gym"],
//             email:"manish@gmail.com",
//             gender: "MALE",
//             phoneNumber:"2222222222",
//             coOrds: [9.343, 18.443],
//             locationCity:"Hyderabad"
//         },
//         {
//             displayName: "Manish3",
//             listOfHobbies:["Cricket", "Football", "gym"],
//             email:"manish3@gmail.com",
//             gender: "MALE",
//             phoneNumber:"2222222222",
//             coOrds: [3.343, 2.443],
//             locationCity:"Hyderabad"

//         },
//         {
//             displayName: "Manish4",
//             listOfHobbies:["Cricket", "Football", "gym"],
//             email:"manish4@gmail.com",
//             gender: "MALE",
//             phoneNumber:"333333333",
//             coOrds: [11.343, 15.443],
//             locationCity:"Hyderabad"

//         },
//         {
//             displayName: "Manish5",
//             listOfHobbies:["Cricket", "Football", "gym"],
//             email:"manish5@gmail.com",
//             gender: "FEMALE",
//             phoneNumber:"2222222222",
//             coOrds: [9.343, 10.443],
//             locationCity:"Hyderabad"

//         },
//         {
//             displayName: "Manish4",
//             listOfHobbies:["Cricket", "Football", "gym"],
//             email:"manish@gmail.com",
//             gender: "MALE",
//             phoneNumber:"2222222222",
//             coOrds: [11.343, 10.443],
//             locationCity:"Hyderabad"

//         },
//         {
//             displayName: "Manish4",
//             listOfHobbies:["Cricket", "Football", "gym"],
//             email:"manish@gmail.com",
//             gender: "MALE",
//             phoneNumber:"2222222222",
//             coOrds: [7.343, 15.443],
//             locationCity:"Hyderabad"

//         }
//     ]
// }
function DashboardPc() {

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
                console.log(data)
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
        }
        fetchUsersWithHobbies();
        }, []);
    return (
        <div style={{display:"flex"}}>
            <div style={{margin:"5% 10%", width:"40%",height:"1200px" }}>
            { (usersList.length !== 0)?
                <Paper style={useStylesPC} sx={{p: '50px',width:"80%",height:"60%", borderRadius: '24px'}}>
                <Typography sx={{marginBottom:2,fontFamily: 'Cinizel-Bold', fontSize:18}} variant="h6">
                        List of users with similar hobbies and location
                    </Typography>
                    {error==='' ? '':
                        <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert onClose={() => {setError('')}} severity="info">{error}</Alert>
                        </Stack>   
                    }
                    <div style={{height:"90%",overflowY:"scroll"}}>
                    
                        {usersList.map((user,index)=>{
                            return(
                                <div key={index} style={{display:"flex"}}>
                                    <img height="40%" width="40%" style={{margin:"5px", borderRadius:"15px"}} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"/>
                                <Card onClick={()=>{updateSelectedUser(user); updateDefaultCenter({lat:user.coOrds[0],lng:user.coOrds[1]})}} sx={{ width:"fill-content", cursor:"pointer",borderRadius:"15px", margin:"5px" }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    {user.displayName}
                                    </Typography>
                                    <Typography gutterBottom variant="body2" color="text.secondary">
                                        Matched Hobbies:{user.listOfHobbies.map(ele=><>{ele}</>)}
                                    </Typography>
                                    <Typography gutterBottom variant="body2" color="text.secondary">
                                        {user.gender}
                                    </Typography>
                                    <p></p>
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
                : <><Paper style={useStylesPC} sx={{p: '50px',width:"fill-content",height:"fill-content", borderRadius: '24px'}}>
                <Typography sx={{marginBottom:2,fontFamily: 'Cinizel-Bold', fontSize:18}} variant="h6">
                        Please add atleast one hobby from profile section <Link onClick={()=>navigate("/profile")}>here</Link>
                </Typography>
                </Paper>
                    </>
            }
            </div>
            { selectedUser?
            <div style={{margin:"10%"}}>
            <Paper style={useStylesPC} sx={{p: '50px',width:"100%",height:"60%", borderRadius: '24px'}}>
                    <Typography sx={{marginBottom:2,fontFamily: 'Cinizel-Bold', fontSize:18}} variant="h6">
                        User Details:
                    </Typography>
                    {error==='' ? '':
                        <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert onClose={() => {setError('')}} severity="info">{error}</Alert>
                        </Stack>   
                    }
                    <div style={{height:"90%", display:"flex", flexWrap:"wrap"}}>
                        <img height="30%" width="30%" style={{margin:"5px", borderRadius:"5px"}} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"/>
                        <div>
                            <Typography sx={{fontFamily: 'Cinizel-Bold', fontSize:18,margin:"5px"}} variant="h6">
                             Name: <span>{selectedUser.displayName}</span>
                            </Typography>
                            <Typography sx={{fontFamily: 'Cinizel-Bold', fontSize:18,margin:"5px"}} variant="h6">
                             Gender: <span>{selectedUser.gender}</span>
                            </Typography>
                            <Typography sx={{fontFamily: 'Cinizel-Bold', fontSize:18,margin:"5px"}} variant="h6">
                             Email: <span>{selectedUser.email}</span>
                            </Typography>
                            <Typography sx={{fontFamily: 'Cinizel-Bold', fontSize:18,margin:"5px"}} variant="h6">
                             Phone: <span>{selectedUser.phoneNumber}</span>
                            </Typography>
                            <Typography sx={{fontFamily: 'Cinizel-Bold', fontSize:18,margin:"5px"}} variant="h6">
                             Location: <span>{selectedUser.locationCity}</span>
                            </Typography>
                        </div>
                        <LoadScript
                            googleMapsApiKey='AIzaSyDT_B26j4LO78DV1YcYahqaq-Ap5oIiPkY'>
                                <GoogleMap
                                mapContainerStyle={mapStyles}
                                zoom={13}
                                center={defaultCenter}
                                />
                            </LoadScript>

                    </div>
                <div>
                
                </div>  
                </Paper>
            </div>
            :""}

        </div>
    )
}

export default DashboardPc
