import * as React from 'react';

import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MailIcon from '@mui/icons-material/Mail';
import Bonds from './Bonds';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import ZoomBond from './ZoomBond';
import { useNavigate } from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';
import DB from '../images/DB3.png';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import '../App.css';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect } from 'react';
const drawerWidth = 160;

export default function Home() {
  const navigate = useNavigate();
  const [date, setDate] = React.useState(dayjs('2021-08-05'));
  
  const onDateChange = (date) => {
    setDate(date)
  }
  const onClickSidebarOption = (data) => {
    
    if (data === 'All Bonds Table') {
      navigate("/home/allbond");
    } else {
      navigate("/home/bonds");
    }
  };

  const logOut = () => {
    
    localStorage.setItem('authenticated', 'false');
    navigate("/login");
  }

  useEffect(()=> {
    if(localStorage.getItem('authenticated') != 'true'){
      navigate("/login");
    }
  })
  

  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar  position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar className="navbar">
          <Box
            component="img"
            sx={{
            height: 44,
            paddingRight: 1
            }}
            alt="Your logo."
            src={DB}
        />
        
        <div className="date-picker">
          <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DatePicker 
                inputFormat="DD-MM-YYYY"
                format="DD-MM-YYYY"
                value={date}
                onChange={(date) => onDateChange(date)}
               sx={{
                svg: { color: '#fff' },
                input: { color: '#fff' },
              }} />
          </LocalizationProvider>
          <LogoutIcon style={{cursor:'pointer', marginTop: '6', marginLeft: '15', marginRight: '7'}} onClick={logOut}/>
        </div>
        
      
        
      
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Bonds', 'All Bonds Table'].map((text, index) => (
              
              <ListItem key={text} disablePadding  onClick={()=> {onClickSidebarOption(text)}}>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <AccountBalanceWalletIcon /> : <AccountBalanceWalletIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Outlet context={[date]}/>
      
    </Box>
    
  </>
  );
}