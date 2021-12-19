import React from 'react'
import Navbar from '../Navbar'
import { useNavigate } from "react-router-dom";
import { Usercontext } from '../../App';
import DashboardPc from './DashboardPc';
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
    return (<div style={{height:"100px"}}>
        <div>
            <Navbar/> 
        </div>
            <DashboardPc />
        </div>
    )
}

export default Dashboard
