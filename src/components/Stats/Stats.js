// REACT
import React from "react";

// MATERIAL UI
import {
  Table,
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Button,
  TableRow,
  Tooltip,
  Paper,
  Alert
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

// CUSTOM COMPONENTS
import CustomInput from "../CustomInput/CustomInput";

const useStyles = makeStyles({
  inputValue: {
    textAlign: "right",
  },
});

export default function BasicTable({
  items = [],
  existProcessHuge = false,
}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} id="scrollfortablecontainer">
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Proceso ID</TableCell>
            <TableCell align="center">Tiempo de retorno (u.t.)</TableCell>
            <TableCell align="center">Tiempo de espera (u.t.)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((process, index) => (
            <TableRow
              key={process.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell component="th" scope="row">
                {process.id}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {process.returnTime}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {process.waitTime}
              </TableCell>


            </TableRow>
          ))}
        </TableBody>
      </Table>
      {existProcessHuge && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flex: 1,
            width: "100%",
            margin: 2,
          }}
        >
          <Alert severity="error">
            Proceso muy grande. Memoria insuficiente.
          </Alert>
        </Box>
      )}
    </TableContainer>
  );
}
