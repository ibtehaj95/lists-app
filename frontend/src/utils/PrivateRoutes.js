import React, { useEffect, useState } from "react";
// import userContext from '../utils/UserContext';
import { Outlet, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import logo from "../../public/logo_size.jpg";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';

const drawerWidth = 240;
const settings = ['Profile Settings', 'Logout'];

function PrivateRoutes(props){
    // const {userObj} = React.useContext(userContext);
    // const navigateTo = useNavigate();
    // console.log(userObj.name);
    // console.log(userObj.name==="loggedOut"?"loggedOut":"legitUser");
    // <Navigate to="/login"></Navigate>;
    //this could also have been used in the ternary in the return statement
    //Would have also been simpler. 
    //But the React team suggests useNavigate in functional components

    // useEffect(() => {
    //     userObj.name==="loggedOut" && navigateTo("/login");
    // },[userObj.name, navigateTo]);

    const navigateTo = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
        };
    
        const handleCloseUserMenu = () => {
        setAnchorElUser(null);
        };

    return (
        // userObj.name!=="loggedOut" && <Outlet></Outlet>
        // 1>0 && <Outlet></Outlet>
        1 > 0 && 
        (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
                    <Container>
                        <Toolbar disableGutters>
                            <div style={{ flexGrow: 1 }}>
                                <Box>
                                    <Typography textAlign="center">{props.location}</Typography>
                                </Box>
                            </div>
                            <Box>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="http://localhost:3000/remy.jpg" />
                                </IconButton>
                                <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                                >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
                <Drawer
                    sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
                        <img src={logo} alt="lists-logo" />
                    </Toolbar>
                    <Divider />
                    <List>
                    {['Home', 'Trash', 'User Management'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                        <ListItemButton 
                            onClick={(event) => { 
                                if(text === "Home"){
                                    navigateTo(`/home`);
                                }
                                else if(text === "Trash"){
                                    navigateTo(`/trash`);
                                }
                                else if(text === "User Management"){
                                    navigateTo(`/manage`);
                                }
                            }}
                        >
                            <ListItemIcon>
                            {text === "Home" ? <HomeIcon /> : (text === "Trash" ? <DeleteIcon /> : (text === "User Management" ? <ManageAccountsIcon /> : <InboxIcon />))}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                            
                        </ListItemButton>
                        </ListItem>
                    ))}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                >
                    <Toolbar />
                    <Outlet></Outlet>
                </Box>
            </Box>
        )
    );
}

export default PrivateRoutes;