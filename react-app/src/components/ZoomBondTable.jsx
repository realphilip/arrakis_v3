import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getMaturedBondsByBondTypeAndDate, getIssuerNameByID, triggerBondRedemption  } from '../services/BondService';
import { useLocation } from 'react-router';
import BondCardTable from './BondCardTable';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const handleRedemption = async (isin, refreshTable) => {
  try {
    const redemptionResult = await triggerBondRedemption(isin);
    
    refreshTable();
  } catch (error) {
    console.error("Error triggering bond redemption:", error);
  }
};

const columns = [
  {
    id: 'redemption',
    label: 'Redeem',
    minWidth: 170,
    align: 'center',
    format: (value, row, refreshTable) => (
      <Button
          variant="contained"
          onClick={() => handleRedemption(row.isin, refreshTable)}
          disabled={row.status !== 'active'}
        >
          Redeem
        </Button>
    ),
  },
  { id: 'isin', label: 'ISIN', minWidth: 170 },
  { id: 'type', label: 'Type', minWidth: 100 },
  {
    id: 'issuerID',
    label: 'Issuer',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'bondMaturityDate',
    label: 'Maturity Date',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'faceValue',
    label: 'Face Value',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'bondCurrency',
    label: 'Currency',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'couponPercent',
    label: 'Coupon %',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'cusip',
    label: 'CUSIP',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];



export default function StickyHeadTable({onRowClick}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const location = useLocation();
  const bondType = location?.state?.type;
  const bondDate = location?.state?.date;
  const [issuerName, setIssuerName] = React.useState('');

  React.useEffect(( ) => {
    
    
    const fetchData = async () => {
      try {
        if (bondType) {
          const maturedBonds = await getMaturedBondsByBondTypeAndDate(bondType, bondDate);
          setRows(maturedBonds);
        }
      } catch (error) {
        console.error('Error fetching bonds:', error);
      }
    };
    fetchData();
  }, [bondType, bondDate]);

  const handleRefreshTable = async () => {
    try {
      const updatedBonds = await getMaturedBondsByBondTypeAndDate(bondType, bondDate);
      setRows(updatedBonds);
    } catch (error) {
      console.error('Error fetching updated bonds:', error);
    }
  };
  
  const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const fetchIssuerNameByID = async (id) => {
    try {
      const name = await getIssuerNameByID(id);
      setIssuerName(name);
    } catch (error) {
      console.error('Error fetching issuer name:', error);
    }
  };


  const handleIssuerIDHover = (id) => {
    fetchIssuerNameByID(id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };



  return (
    <div style={{ width: '100%' }}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        {/* Set a fixed height for the table container */}
        <TableContainer sx={{ maxHeight: 400, overflowY: 'auto' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.isin}
                      onMouseEnter={() => handleIssuerIDHover(row.issuerID)}
                      onMouseLeave={() => setIssuerName('')}
                      onClick={() => onRowClick(row.isin)}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'bondMaturityDate'
                              ? formatDate(value)
                             :column.id === 'issuerID' ? (
                              <Tooltip
                                title={
                                  <Typography variant="subtitle1">{issuerName}</Typography>
                                }
                              >
                                <span style={{ fontSize: '16px' }}>{value}</span>
                              </Tooltip>
                            ) : column.id === 'redemption' ? (
                              // Pass the refreshTable function to the Redemption button
                              column.format(value, row, handleRefreshTable)
                            ) : (
                              column.format && typeof value === 'number'
                                ? column.format(value)
                                : value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}