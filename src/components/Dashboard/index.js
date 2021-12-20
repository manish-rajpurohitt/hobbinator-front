import React from 'react'
import Navbar from '../Navbar'
import { useNavigate } from "react-router-dom";
import { Usercontext } from '../../App';
import {Box} from "@mui/material";
import DashboardPc from './DashboardPc';
import DashboardMobile from "./DashboardMobile";
function Dashboard() {
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
            <DashboardPc />
        </Box>
        </div>
        <div>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <DashboardMobile />
        </Box>
        </div>
        </div>
    )
}

export default Dashboard
