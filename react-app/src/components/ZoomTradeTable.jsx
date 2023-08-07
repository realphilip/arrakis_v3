import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getAllTradesByISIN } from '../services/BondService';
import { useState, useRef } from 'react';
import { DialogBox } from './DialogBox';

const columns = [
  { id: 'isin', label: 'ISIN', minWidth: 170 },
  {
    id: 'bookId',
    label: 'Book ID',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'bondHolderID',
    label: 'Bond Holder ID',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'unitPrice',
    label: 'Unit Price',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'tradeCurrency',
    label: 'Trade Currency',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'tradeType',
    label: 'Trade Type',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'tradeDate',
    label: 'Trade Date',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'tradeSettlementDate',
    label: 'Trade Settlement Date',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'quantity',
    label: 'Quantity',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

export default function ZoomTradeTable({ isin }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [selectedBondHolderID, setSelectedBondHolderID] = useState(null);
  const dialogRef = useRef();
  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (isin) {
          const trades = await getAllTradesByISIN(isin);
          setRows(trades);
        }
      } catch (error) {
        console.error('Error fetching trades:', error);
      }
    };

    fetchData();
  }, [isin]);

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
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
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.isin}>
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                {column.id === 'tradeDate'
                                  ? formatDate(value)
                                  :column.id === 'tradeSettlementDate'
                                  ? formatDate(value)
                                  :column.id === 'bondHolderID' ? (
                                  <span
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                      setSelectedBondHolderID(value);
                                      dialogRef.current.openDialog(value);
                                    }}
                                  >
                                    {column.format && typeof value === 'number'
                                      ? column.format(value)
                                      : value}
                                  </span>
                                ) : (
                                  column.id === 'status' ? (
                                    <span style={{ color: value === 'closed' ? 'red' : '#33b652' }}>
                                      {column.format && typeof value === 'number'
                                        ? column.format(value)
                                        : value}
                                    </span>
                                  ) : (
                                    column.format && typeof value === 'number'
                                      ? column.format(value)
                                      : value
                                  )
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
      <DialogBox ref={dialogRef} bondHolderName={selectedBondHolderID} />
    </div>
  );
}
