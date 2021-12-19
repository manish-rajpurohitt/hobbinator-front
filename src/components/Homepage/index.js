import React from "react";
import Navbar from "../Navbar/index";
import { Usercontext } from "../../App";
import Login from "../Loginpage";
import Signup from "../Signuppage";
import { useNavigate } from "react-router-dom";

const Homepage = () => {

    const {state, dispatch} = React.useContext(Usercontext);
    const navigate = useNavigate();
    React.useEffect(()=>{
        if(localStorage.getItem("authToken"))
            navigate("/dashboard")
     })
    return(
        <>
        <Navbar />
        <div>
         <div className="">
         {state.showLogin ? <Login />:<Signup />}
         </div>
         </div>
        </>
    )
}

export default Homepage;