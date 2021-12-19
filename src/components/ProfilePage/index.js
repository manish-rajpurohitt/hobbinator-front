import React from 'react'
import Navbar from '../Navbar'
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import "./index.css"
import Chip from '@mui/material/Chip';
import { Avatar, Card, CardContent, TextField, CardActions,Divider,ListItemAvatar, Paper,List, ListItemButton,ListItemText,Demo, Typography,Grid, Button,ListItem, Alert,Stack,Box, Radio, Link, RadioGroup, FormControlLabel, makeStyles, Fade, } from "@mui/material";
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

function ProfilePage() {
    const [error, setError] = React.useState("");
    const [listOfHobbies, updateListOfHobbies] = React.useState([]);
    const navigate = useNavigate();
    

    const [filteredData, setFilteredData] = React.useState([]);
  const [wordEntered, setWordEntered] = React.useState("");
  const [user,updateUser] = React.useState({listOfHobbies:[]});
    const [userSelectedHobbies, updateUserSelectedHobbies] = React.useState([]);
    const [showDetails, updateShowDetails] = React.useState(true);
    const [newUserDetails, updateNewUserDetails] = React.useState({});

    

    React.useEffect(async ()=>{

        const config = {
            headers: {
              "Content-Type" : "application/json",
              Authorization : `Bearer ${localStorage.getItem("authToken")}`
            }
          }

          try{
            const {data} = await api.get("/api/user/hobby/getAllHobbies", config);
            updateListOfHobbies(data);
            updateNewUserDetails({
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber
            })
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
    const fetchData = async ()=>{
    
    try{
        const {data} = await api.get("/api/user/getUserById/"+localStorage.getItem("userId"), config);
        updateUser(data);
        updateUserSelectedHobbies(data.listOfHobbies);
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
    
    
}, [])

    const handleFilter = (event) => {
        

        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = listOfHobbies.filter((value) => {
          return value.hobbyName.toLowerCase().includes(searchWord.toLowerCase());
        });
    
        if (searchWord === "") {
          setFilteredData([]);
        } else {
          setFilteredData(newFilter);
        }
      };

      const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
      };

      const handleSelected = (e) =>{
        for(var i = 0; i < userSelectedHobbies.length; i++) {
            if (userSelectedHobbies[i].hobbyId === e.target.id) {
                return;
            }
        }  
        const hobby = {
              hobbyId: e.target.id,
              hobbyName: e.target.innerText
          };   
        const list = [...userSelectedHobbies];
          list.push(hobby);
          updateUserSelectedHobbies(list);
      }

      const handleDelete = (e)=>{
          let someArray = userSelectedHobbies;
        var filtered = someArray.filter(function(el) { return el.hobbyId !== e.hobbyId; }); 
        updateUserSelectedHobbies(filtered)
      }

      const handleSave = async () => {
        const config = {
            headers: {
              "Content-Type" : "application/json",
              Authorization : `Bearer ${localStorage.getItem("authToken")}`
            }
          }
          if(userSelectedHobbies.length === 0) {
              setError("Add atleast one hobby");
              setTimeout(()=>{
                setError("");
            }, 2000)
              return;
          }

          try{
            const {data} = await api.post("/api/user/hobby/updateHobby",{listOfHobbies: userSelectedHobbies}, config);
            setError(data.data);
            setTimeout(()=>{
                setError("");
            }, 5000)
          }
          catch(error){
            setError(error.response.data.error);
            setTimeout(()=>{
                setError("");
            }, 5000)
            return;
          }
          updateUser({...user, listOfHobbies:userSelectedHobbies});
      }

      const handleSaveUser = async () => {
        console.log(newUserDetails, user);
        if(user.firstName === newUserDetails.firstName || user.lastName === newUserDetails.lastName || user.phoneNumber === newUserDetails.phoneNumber ) return;

        const config = {
            headers: {
              "Content-Type" : "application/json",
              Authorization : `Bearer ${localStorage.getItem("authToken")}`
            }
          }
          if(userSelectedHobbies.length === 0) {
              setError("Add atleast one hobby");
              setTimeout(()=>{
                setError("");
            }, 2000)
              return;
          }

          try{
              const {firstName, lastName, phoneNumber} = newUserDetails;
            const {data} = await api.post("/api/user/updateProfile",{firstName, lastName, phoneNumber}, config);
            setError(data.data);
            setTimeout(()=>{
                setError("");
            }, 5000)
          }
          catch(error){
            setError(error.response.data.error);
            setTimeout(()=>{
                setError("");
            }, 5000)
            return;
          }
          updateShowDetails(true);
          updateUser({...user, firstName:newUserDetails.firstName, lastName:newUserDetails.lastName, phoneNumber:newUserDetails.phoneNumber, displayName: newUserDetails.firstName+" "+newUserDetails.lastName});
      }
    return (
        <div>
            <div>
                <Navbar/>
            </div>
            <div style={{display:"flex",  margin:"10% 20%",marginRight:"10px"}}>
            <div >
                <Paper style={useStylesPC} sx={{p: '50px',width:"fill-content",height:"fill-content", borderRadius: '24px'}}>
                    <Typography sx={{marginBottom:2,fontFamily: 'Cinizel-Bold', fontSize:18}} variant="h6">
                        Profile
                    </Typography>
                    {error==='' ? '':
                        <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert onClose={() => {setError('')}} severity="info">{error}</Alert>
                        </Stack>   
                    }
                    <div>
                    {showDetails?
                    <>
                    <Typography sx={{marginBottom:2,fontFamily: 'Cinizel-Bold', fontSize:18}} variant="h6">
                        Name: {user.displayName}
                    </Typography>
                    <Typography sx={{marginBottom:2,fontFamily: 'Cinizel-Bold', fontSize:18}} variant="h6">
                    Phone Number: {user.phoneNumber}
                </Typography>
                </>
                    : 
                    <>
                        <Typography sx={{marginBottom:2,fontFamily: 'Cinizel-Bold', fontSize:18}} variant="h6">
                        First Name:
                        </Typography>
                        <TextField value={newUserDetails.firstName} onChange={(e)=>updateNewUserDetails({...newUserDetails, firstName: e.target.value})}  />
                        <Typography sx={{marginBottom:2,fontFamily: 'Cinizel-Bold', fontSize:18}} variant="h6">
                        Last Name:
                        </Typography>
                        <TextField value={newUserDetails.lastName} onChange={(e)=>updateNewUserDetails({...newUserDetails, lastName: e.target.value})} />
                        <Typography sx={{marginBottom:2,fontFamily: 'Cinizel-Bold', fontSize:18}} variant="h6">
                        Phone Number:
                        </Typography>
                        <TextField value={newUserDetails.phoneNumber} onChange={(e)=>updateNewUserDetails({...newUserDetails, phoneNumber: e.target.value})}  />
                    </>}
                    <Typography sx={{marginBottom:2,fontFamily: 'Cinizel-Bold', fontSize:18}} variant="h6">
                        Gender: {user.gender}
                    </Typography>
                    <Typography sx={{marginBottom:2,fontFamily: 'Cinizel-Bold', fontSize:18}} variant="h6">
                        Location: {user.locationCity}
                    </Typography>
                    
                    <Typography sx={{marginBottom:2,fontFamily: 'Cinizel-Bold', fontSize:18}} variant="h6">
                        email: {user.email}
                    </Typography>
                    <Button
                        variant="contained"
                        disabled={showDetails? false : true}
                        sx={{
                            height: 50,
                            margin:"2px 5px" 
                        }}
                        size="large"
                        onClick={()=>updateShowDetails(!showDetails)}
                    >Update</Button>
                    <Button
                        disabled={showDetails? true : false}
                        variant="contained"
                        sx={{
                            height: 50,
                            margin:2 
                        }}
                        size="large"
                        onClick={()=>handleSaveUser()}
                    >Save</Button>
                    </div>  
                </Paper>
            </div>

                <div>
                    <div>
                <Paper style={useStylesPC} sx={{p: '50px',width:"80%",height:"60%", borderRadius: '24px'}}>
                <div>
                    <Typography sx={{marginBottom:2,fontFamily: 'Cinizel-Bold', fontSize:18}} variant="h6">
                            My Hobbies:
                    </Typography>
                    { user.listOfHobbies.map(hobby=><Chip style={{margin:1}} label={hobby.hobbyName} />)}
                        
                </div>
                <div>
                <Typography sx={{marginBottom:2,fontFamily: 'Cinizel-Bold', fontSize:18}} variant="h6">
                            Selected Hobbies:
                    </Typography>
                    {userSelectedHobbies.map(hobby=><Chip label={hobby.hobbyName} variant="outlined" onDelete={()=>handleDelete(hobby)} />)}
                    <div> 
                    <Button
                        variant="contained"
                        sx={{
                            height: 50,
                            marginTop:2 
                        }}
                        size="large"
                        onClick={()=>handleSave()}
                    >Save</Button>
                    </div>
                </div>
                    <Typography sx={{marginBottom:2,fontFamily: 'Cinizel-Bold', fontSize:18}} variant="h6">
                            Hobbies:
                        </Typography>
                        <div className="search">
                            <div className="searchInputs">
                                <input
                                type="text"
                                value={wordEntered}
                                onChange={handleFilter}
                                />
                                <div className="searchIcon">
                                {filteredData.length === 0 ? (
                                    <SearchIcon />
                                ) : (
                                    <CloseIcon id="clearBtn" onClick={clearInput} />
                                )}
                                </div>
                            </div>
                            {filteredData.length != 0 && (
                                <div className="dataResult">
                                {filteredData.slice(0, 15).map((value, key) => {
                                    return (
                                    <p id={value._id} onClick={(e)=>handleSelected(e)} className="dataItem" >
                                        {value.hobbyName}
                                    </p>
                                    );
                                })}
                                </div>
                            )}
                        </div>



                        
                    <div>
                    </div>  
                    </Paper>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
