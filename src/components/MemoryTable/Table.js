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
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, overflow: "hidden" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Nombre Partición</TableCell>
            <TableCell align="center">Tamaño total (MB)</TableCell>
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
                {partition.size}MB
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
