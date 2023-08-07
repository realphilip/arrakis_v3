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
        {bonds && <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
            <Toolbar />
            <Row className="row">
        
              {Object.entries(bonds).map(([date, values, index]) => (
                <div className="container" key={date}>
                  <BondCard key={date} date={formatDate(date)}  bond={values} currentDate={currentDate} /> 
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