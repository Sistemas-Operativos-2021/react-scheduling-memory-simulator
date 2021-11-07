import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { TableRow } from "@mui/material";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  inputValue: {
    textAlign: "right",
  },
});

export default function BasicTable({ items = [] }) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: '25%' }}>
      <Table  >
        <TableHead>
          <TableRow>
            <TableCell>Nombre Partición</TableCell>
            <TableCell align="center">Proceso ID</TableCell>
            <TableCell align="center">Tamaño total (MB)</TableCell>
            <TableCell align="center">Espacio Usado (MB)</TableCell>
            <TableCell align="center">Fragmentacion Interna (MB)</TableCell>
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
                {partition.size}MB
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {partition.usedSpace}MB
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {partition.size - partition.usedSpace}MB
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
