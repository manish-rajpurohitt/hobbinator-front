import React from 'react'
import Navbar from '../Navbar'
import { useNavigate } from "react-router-dom";
import { Usercontext } from '../../App';
import {Box} from "@mui/material";
import Profilepagemobile from "./ProfilrpageMobile";
import Profilepagepc from './ProfilepagePc';
function ProfilePage() {
    const navigate = useNavigate();
    const {state, dispatch} = React.useContext(Usercontext);
    React.useEffect(()=>{
        if(!localStorage.getItem("authToken")){
            navigate("/");
        }else{
            dispatch({type:"AUTH", loginState:true});
        }
    }, [dispatch])
    return (<div>
        <div>
            <Navbar/> 
        </div>
        <div>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Profilepagepc />
        </Box>
        </div>
        <div>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Profilepagemobile />
        </Box>
        </div>
        </div>
    )
}

export default ProfilePage
