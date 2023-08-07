import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import BondCard from './BondCard';

const columns = [
  { id: 'type', label: 'Type', minWidth: 170 },
  { id: 'issuerID', label: 'Bonds Mature', minWidth: 50 },
];

const typeOfBonds = { CORP: 0, GOVN: 0, SOVN: 0 };

export default function BondCardTable({ bond, date }) {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('name');

  const showBonds = (type) => {
    if (bond[type] > 0) {
    console.log(type);
    console.log(date);
    navigate("/home/zoombond", { state: { type, date } });
    }
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  return (
   
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  onClick={() => showBonds(column.id === 'type' ? column.id : null)}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(typeOfBonds).map(([key, value]) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={key}>
                <TableCell>
                  {key}
                </TableCell>
                <TableCell
                  onClick={() => showBonds(key)}
                  style={{
                    cursor: 'pointer',
                    color: 'red'
                  }}
                >
                  {bond[key] ? bond[key] : 0}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

  );
}