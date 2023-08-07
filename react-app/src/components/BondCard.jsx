import * as React from 'react';
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red, green,orange } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BondCardTable from './BondCardTable';
import Row from "react-bootstrap/Row";
import { format, compareAsc } from 'date-fns';
import { isBefore, isAfter, isEqual } from 'date-fns';
import dayjs from 'dayjs';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function BondCard({ date, bond, currentDate }) {
  const [expanded, setExpanded] = React.useState(false);
  const [newDate, setDate ] = React.useState();
  const [cardColor, setCardColor] = React.useState();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  

  const getBackgroundColor = () =>{
    const dateGot =  formatDate(date);
    const date2 =  formatDate(currentDate);

    const date1 = dayjs(dateGot, 'DD-MM-YYYY');
    const currentDateParsed = dayjs(date2, 'DD-MM-YYYY');

    // Compare the two dates
    const isDate1BeforeCurrentDate = date1.isBefore(currentDateParsed);
    const isDate1AfterCurrentDate = date1.isAfter(currentDateParsed);
    const areDatesEqual = date1.isSame(currentDateParsed);
 
    
    return areDatesEqual ? orange[300]: isDate1BeforeCurrentDate ? red[300]: green[300];

  }

  const formatDate = (date) => {
     return dayjs(date,'DD-MM-YYYY').format('DD-MM-YYYY');
  }
  // Compare the selected date with the current date
  
    
  return (
    <Card sx={{ maxWidth: 320}}>
        <CardHeader  sx={{ maxWidth: 320, backgroundColor: getBackgroundColor }} title={date} />
      <CardContent>
        <BondCardTable bond={bond} date={date} />
      </CardContent>
    </Card>
  );
}