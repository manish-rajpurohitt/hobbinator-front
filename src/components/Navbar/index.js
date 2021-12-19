import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Usercontext } from '../../App';
import { useNavigate } from 'react-router-dom';

const pages = ['About', 'Services', 'Team'];

const signInLogInStyle = {
    width: "fit-content",
    color:"rgba(36, 0, 69, 1)",
    height: "44px",
    marginRight:10,
    marginTop:15,
    border: 0,
    background: "linear-gradient(89.5deg, #998BEF 2.96%, #DDDAF0 98.27%)",
    borderRadius: "22px",
    cursor: "pointer", 
    mt: "20px",
    mr:"20px",
    fontSize:"18px",
    fontFamily:"Cinizel-Bold"
}



const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const {state, dispatch} = React.useContext(Usercontext);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSignOut = (e) => {
    localStorage.removeItem("authToken");
    dispatch({type:"AUTH", loginState:false})
    dispatch({type:"HOMEPAGE", showLogin:true})
    handleCloseNavMenu();
    navigate("/");
  }
  return (
    <div className='navbar'>
    <AppBar position="static" style={{ mt:40,fontFamily: "Cinizel-Regular", background:"rgba(36, 0, 69, 1)"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor:"pointer",fontFamily: "Cinizel-Regular", mr:60, fontSize:"20px", display: { xs: 'none', md: 'flex' }, }}
          >
            <h1>Hobbinator</h1>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { fontFamily:"Cinizel-Regular", xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
               {state.loginState ?
               <div>
                <MenuItem onClick={()=>navigate("/dashboard")}><Typography>Dashboard</Typography></MenuItem>
                <MenuItem onClick={()=>navigate("/profile")}><Typography>Profile</Typography></MenuItem>
                <MenuItem  onClick={(e)=>handleSignOut(e)}><Typography>SignOut</Typography></MenuItem>
              </div> 
                          : 
              <div>
                <MenuItem onClick={()=>{dispatch({type:"HOMEPAGE",showLogin:false}); handleCloseNavMenu();}}><Typography>SignUp</Typography></MenuItem>
                <MenuItem onClick={()=>{dispatch({type:"HOMEPAGE",showLogin:true}); handleCloseNavMenu();}} ><Typography>LogIn</Typography></MenuItem>
              </div>
              }
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' },fontFamily:"Cinizel-Regular", fontSize:"20px" }}
          >
            Hobbinator
          </Typography>
          <Box sx={{ flexGrow: 1,display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2,mr:2, color: 'white',fontFamily:"Cinizel-Regular", fontSize:"20px", display: 'block' }}
              >
                {page}
              </Button>
            ))}
            {
              state.loginState ? 
              <>
                <Button style={signInLogInStyle} onClick={()=>navigate("/dashboard")}><p>Dashboard</p></Button>
                <Button style={signInLogInStyle} onClick={()=>navigate("/profile")}><p>Profile</p></Button>
                <Button style={signInLogInStyle} onClick={(e)=>handleSignOut(e)}><p>SignOut</p></Button>
              </> 
              : 
              <>
                <Button style={signInLogInStyle} onClick={()=>dispatch({type:"HOMEPAGE",showLogin:false})}><p>SignUp</p></Button>
                <Button style={signInLogInStyle} onClick={()=>dispatch({type:"HOMEPAGE",showLogin:true})} ><p>LogIn</p></Button>
              </>
            }
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </div>
  );
};
export default Navbar;