import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { TableRow } from "@mui/material";
import Paper from "@mui/material/Paper";

export default function BasicTable({ items = [], width= 0 }) {
  return (
    <TableContainer component={Paper} sx={{ width: `${width}%` }}>
      <Table  >
        <TableHead>
          <TableRow>
            <TableCell>Nombre Partición</TableCell>
            <TableCell align="center">Proceso ID</TableCell>
            <TableCell align="center">Tamaño total (KB)</TableCell>
            <TableCell align="center">Espacio Usado (KB)</TableCell>
            <TableCell align="center">Fragmentacion Interna (KB)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((partition) => (
            <TableRow
              key={partition.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {partition.name}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {partition.idProcess}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {partition.size}KB
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {partition.usedSpace}KB
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {partition.isInUse ? `${partition.size - partition.usedSpace}KB`: '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
