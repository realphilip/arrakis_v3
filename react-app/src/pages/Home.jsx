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
import DescriptionIcon from '@mui/icons-material/Description';
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
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { getUserData } from '../services/BondService';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react';
import {getIsinsOfUrgentUnredeemedBonds} from '../services/BondService'
import format from 'date-fns/format';
import { maxWidth } from '@mui/system';
import Badge from '@mui/material/Badge';
import BondDialogBox from '../components/BondDialogBox';

const drawerWidth = 160;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function stringAvatar(name) {
  console.log(name.user)
  return {
    sx: {
      bgcolor: stringToColor(name.user),
    },
    children: `${capitalizeFirstLetter(name.user[0])}`,
  };
}
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export default function Home() {
  const navigate = useNavigate();
  const [date, setDate] = React.useState(dayjs('2021-08-05'));
  const [user, setUser] = React.useState('a');
  const onDateChange = (date) => {
    setDate(date)
  }
  const onClickSidebarOption = (data) => {
    console.log(data);
    if (data === 'Bonds & Trades') {
      navigate("/home/allbond");
    } else {
      navigate("/home/bonds");
    }
  };
  const [resolvedIsins, setResolvedIsins] = useState([]);
  const [showBondDialog, setShowBondDialog] = useState(false);
  const [selectedIsin, setSelectedIsin] = useState('');
  const [urgentIsins, setUrgentIsins] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleIsinClick = (isin) => {
    setSelectedIsin(isin);
    setShowBondDialog(true);
  };

  const logOut = () => {
    
    localStorage.setItem('authenticated', 'false');
    localStorage.setItem('jwtToken', null);
    navigate("/login");
  }

  useEffect(()=> {
    if(localStorage.getItem('authenticated') != 'true'){
      navigate("/login");
    }
    getUserData().then((data)=> {
      console.log(data)
      setUser(data)
    }).catch((error) => {
      console.log('error getting user data');
    })
  })

  useEffect(() => {
    let newDate = new Date(date);
    newDate = format(newDate, 'dd-MM-yyyy');
    getIsinsOfUrgentUnredeemedBonds(newDate)
      .then((isin) => {
        setUrgentIsins(isin);
      })
      .catch((error) => {
        console.error('Error fetching urgent unredeemed bonds:', error);
      });
  }, [date]);

  const generateNotificationMessage = (isin) => {
    const unresolvedIsins = isin.filter((id) => !resolvedIsins.includes(id));

    const count = unresolvedIsins.length;
    if (count === 0) {
      return 'No urgent bond redemptions for the selected date.';
    }
    const ids = unresolvedIsins.map((id) => (
      <span
        key={id}
        style={{ color: 'red', cursor: 'pointer' }}
        onClick={() => handleIsinClick(id)}
      >
        {id}
      </span>
    ));
    const idsWithNewLine = ids.reduce((acc, id) => (
      <>
        {acc}
        <br /> 
        {id}
      </>
    ));
  
    return (
      <div style={{ textAlign: 'justify' }}>
        {`You have `}
        <span style={{ color: 'red' }}>{count}</span>
        {` bond${count > 1 ? 's' : ''} with urgent redemption coming through that are past or at their expiration date! \n\nISIN:\n\ `}
        {idsWithNewLine}
      </div>
    );
  };
  

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
         
        <div style={{color: 'white', fontSize: 25, fontWeight:700}} >Bond Brigade</div>

        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
       
        <div className="date-picker" >
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
          
         
        </div>
        <Tooltip title={user} style={{}}>
        <IconButton>
          <Avatar style={{ backgroundColor:'green'}}>{capitalizeFirstLetter(user[0])}</Avatar>
       </IconButton>
       </Tooltip>
       <IconButton>
          <Badge badgeContent={urgentIsins.length - resolvedIsins.length} color="error">
            <NotificationsIcon
              style={{ cursor: 'pointer', marginRight: '10px', marginLeft: '10px', color: '#fff' }}
              onClick={handleNotificationsClick}
            />
          </Badge>
        </IconButton>
        <LogoutIcon style={{cursor:'pointer', marginLeft: '15', marginRight: '7'}} onClick={logOut}/>
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
            {['Bonds', 'Bonds & Trades'].map((text, index) => (
              
              <ListItem key={text} disablePadding  onClick={()=> {onClickSidebarOption(text)}}>
                <ListItemButton>
                  <ListItemIcon>
                     {index === 0 ? <AccountBalanceWalletIcon /> : index === 1 ? <DescriptionIcon /> : null}
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
    <Drawer
        anchor="right"
        open={showNotifications}
        onClose={() => setShowNotifications(false)}
      >
        <div style={{ padding: '90px', maxWidth: '370px' }}>
          <Typography variant="h6" style={{ marginBottom: '16px' }}>
            Urgent Redemptions
          </Typography>
          <Typography style={{ whiteSpace: 'pre-line' }}>
            {generateNotificationMessage(urgentIsins)}
          </Typography>
        </div>
    </Drawer>
    <BondDialogBox
      open={showBondDialog}
      handleClose={() => setShowBondDialog(false)}
      isin={selectedIsin}
      refreshTable={() => {
        setResolvedIsins((prevIsins) => [...prevIsins, selectedIsin]);
      }}
    />
  </>
  );
}