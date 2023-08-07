import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { getIssuerNameByID, triggerBondRedemption } from '../services/BondService';
import { useLocation } from 'react-router';
import { getAllBonds } from '../services/BondService';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


const handleRedemption = async (isin, refreshTable) => {
  try {
    const redemptionResult = await triggerBondRedemption(isin);
    console.log("Redemption result:", redemptionResult);
    refreshTable();
  } catch (error) {
    console.error("Error triggering bond redemption:", error);
  }
};

const columns = [
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
    {
      id: 'cusip',
      label: 'CUSIP',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
  ];

const ZoomBondTableAll = ({ onRowClick }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const location = useLocation();
  const bondType = location?.state?.type;
  const bondDate = location?.state?.date;
  const [issuerName, setIssuerName] = React.useState('');

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming you have a function named getAllBonds
        const bonds = await getAllBonds();
        setRows(bonds);
      } catch (error) {
        console.error('Error fetching bonds:', error);
      }
    };

    fetchData();
  }, []);

  const fetchIssuerNameByID = async (id) => {
    try {
      const name = await getIssuerNameByID(id);
      setIssuerName(name);
    } catch (error) {
      console.error('Error fetching issuer name:', error);
    }
  };

  const handleRefreshTable = async () => {
    try {
      const updatedBonds = await getAllBonds();
      setRows(updatedBonds);
    } catch (error) {
      console.error('Error fetching updated bonds:', error);
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
                      // Add onClick handler for each row
                      onClick={() => onRowClick(row.isin)}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'issuerID' ? (
                              <Tooltip
                                title={
                                  <Typography variant="subtitle1">
                                    {issuerName}
                                  </Typography>
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
};

export default ZoomBondTableAll;
