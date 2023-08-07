// BondDialogBox.jsx
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { getBondByIsin, triggerBondRedemption } from '../services/BondService';

const BondDialogBox = ({ open, handleClose, isin, refreshTable }) => {
  const [bond, setBond] = React.useState(null);

  React.useEffect(() => {
   
    const fetchBond = async () => {
      try {
        const bondData = await getBondByIsin(isin);
        setBond(bondData);
      } catch (error) {
        console.error('Error fetching bond details:', error);
      }
    };

    if (open && isin) {
      fetchBond();
    }
  }, [open, isin]);

  const handleRedemption = async () => {
    try {
      const updatedStatus = await triggerBondRedemption(isin);
      if (updatedStatus) {
      
        setBond((prevBond) => ({
          ...prevBond,
          status: 'redeemed',
        }));

    
        refreshTable();
      }
    } catch (error) {
      console.error('Error triggering bond redemption:', error);
    }
  };

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formattedDate;
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Bond Details</DialogTitle>
      <DialogContent>
        {bond ? (
          <DialogContentText>
            ISIN: {bond.isin}
            <br />
            Type: {bond.type}
            <br />
            Issuer: {bond.issuerID}
            <br />
            Maturity Date: {formatDate(bond.bondMaturityDate)}
            <br />
            Face Value: {bond.faceValue.toFixed(2)}
            <br />
            Currency: {bond.bondCurrency}
            <br />
            Coupon %: {bond.couponPercent.toFixed(2)}
            <br />
            Status: {bond.status}
            <br />
            CUSIP: {bond.cusip}
          </DialogContentText>
        ) : (
          <DialogContentText>Loading...</DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        {bond && bond.status === 'active' && (
          <Button variant="contained" onClick={handleRedemption} color="secondary">
            Redeem
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BondDialogBox;
