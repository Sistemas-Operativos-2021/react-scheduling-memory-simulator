import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { TableRow } from "@mui/material";
import Paper from "@mui/material/Paper";


export default function BasicTable({ items = [], title }) {
  return (
    <TableContainer component={Paper} sx={{ width: '30%' }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableCell>{title}</TableCell>
        </TableHead>
        <TableHead>
          <TableRow>
            <TableCell>Proceso ID</TableCell>
            <TableCell align="center">Tiempo de arribo</TableCell>
            <TableCell align="center">Tiempo de irrupcion</TableCell>
            <TableCell align="center">Tiempo de tamaño</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((process) => (
            <TableRow
              key={process.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {process.id}
              </TableCell>

              <TableCell align="center" component="th" scope="row">
                {process.arrival_time}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {process.irruption_time}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {process.size}KB
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
