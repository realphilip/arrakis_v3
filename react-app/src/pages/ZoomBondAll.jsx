import React, { useState } from "react";
import ZoomTradeTable from "../components/ZoomTradeTable";
import Box from '@mui/material/Box';
import '../App.css';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useEffect } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Row from "react-bootstrap/Row";
import ZoomBondTableAll from "../components/ZoomBondTableAll";

const ZoomBondAll = () => {
  const [selectedISIN, setSelectedISIN] = useState('');

  const handleRowClick = (isin) => {
    setSelectedISIN(isin);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Row className="row">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card className="card">
              <CardHeader className="cardHeader" title="BOND TABLE" />
              <CardContent className="cardContent">
                <TableContainer component={Paper}>
                  {/* Pass onRowClick prop to ZoomBondTable */}
                  <ZoomBondTableAll onRowClick={handleRowClick} />
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="card">
              <CardHeader className="cardHeader" title="TRADE TABLE" />
              <CardContent className="cardContent">
                <TableContainer component={Paper}>
                  {/* Pass isin prop to ZoomTradeTable */}
                  <ZoomTradeTable isin={selectedISIN} />
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Row>
    </Box>
  );
};

export default ZoomBondAll;
