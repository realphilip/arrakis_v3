import * as React from 'react';
import Box from '@mui/material/Box';
import '../App.css';
import Toolbar from '@mui/material/Toolbar';
import Row from "react-bootstrap/Row";
import Typography from '@mui/material/Typography';
import BondCard from '../components/BondCard';
import { useOutletContext } from "react-router-dom";
import { useEffect } from 'react';
import  {getAllBondsForBusinessDaysBeforeAndAfter, getAllBonds} from '../services/BondService';
import { format } from 'date-fns';
import { useState } from 'react';
import { Grid } from '@mui/material';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';
import {white } from '@mui/material/colors';

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#0063cc',
  borderColor: '#0063cc',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#FFFFFF'),
  backgroundColor: '#FFFFFF',
  '&:hover': {
    backgroundColor: '#FFFFFF',
  },
}));

function Bonds() {
    const [bonds, setBonds] = new React.useState([]);
    const [currentDate] = useOutletContext();
  
    const getBonds = ()=> {
      getAllBonds().then((data) => {
          console.log(data)
      })
      .catch((error) => console.error("Error fetching bonds:", error));
    }
  
    const getBondsByDate = () => {    
      let newDate = new Date(currentDate);
      newDate = format(newDate, 'dd-MM-yyyy');
      getAllBondsForBusinessDaysBeforeAndAfter(newDate).then((data) => {
        console.log(data)
        console.log('bonds data')
        console.log(data);  
        setBonds(data);
      }).catch((error) => {
          console.log(error)
      })
    }
    
    const getMyBonds = () => {
      let newDate = new Date(currentDate);
      newDate = format(newDate, 'dd-MM-yyyy');
      getAllBondsForBusinessDaysBeforeAndAfter(newDate).then((data) => {
        console.log(data)
        console.log('bonds data')
        console.log(data);  
        setBonds(data);
      }).catch((error) => {
          console.log(error)
      })
    } 

    useEffect(() => {
        try {
            if (localStorage.getItem('authenticated')=='true'){
                 getBondsByDate();
            }
            
        } catch (error) {
            console.error("Error fetching bonds:", error);
        }

    }, [currentDate, localStorage.getItem('authenticated')]);

    const formatDate = (date) => {
      const d = dayjs(date,'DD-MM-YYYY').format('DD-MM-YYYY');
      return d;
    }


    return (
      <div>
        <Toolbar />
        
         
        {bonds && <Box component="main" sx={{ flexGrow: 1, p: 2 }} >
          <div className="filters" style={{display: 'flex', justifyContent:'flex-end'}}>
            <ColorButton variant="contained"  style={{ margin: "0 10px"}} onClick={getBondsByDate}>Bonds</ColorButton>
            <ColorButton variant="contained" style={{ margin: "0 10px"}}>My Bonds</ColorButton>
            <ColorButton variant="contained" style={{ margin: "0 10px"}}>Redeemed Bonds</ColorButton>
            <ColorButton variant="contained" style={{ margin: "0 15px"}}>Unredeemed Bonds</ColorButton>
          </div>
            <Row className="row">
        
              {Object.entries(bonds).map(([date, values, index]) => (
                <div className="container" key={date}>
                  <BondCard key={index} date={formatDate(date)}  bond={values} currentDate={currentDate} /> 
                </div>
                // <div className="container" key={date}>
                //   <BondCard key={index} bond={values} date={date} /> 
                // </div>
              ))}
      
            </Row>
          
              {/* <Row className="row">
                    {bonds.map((bond, index) => (
                      <div className="container" key={index}>
                        <BondCard key={index} bond={bond} date={date} /> 
                      </div>
                    ))}
              </Row> */}
          </Box>}
          
        </div>
      );
      
}

export default Bonds