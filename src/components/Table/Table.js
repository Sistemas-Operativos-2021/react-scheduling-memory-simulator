import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { TableRow, Tooltip } from "@mui/material";
import Paper from "@mui/material/Paper";
import CustomInput from "../CustomInput/CustomInput";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  inputValue: {
    textAlign: "right",
  },
});

export default function BasicTable({ items = [], handleInputs }) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, overflow: "hidden" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Proceso ID</TableCell>
            <TableCell align="center">Tiempo de arribo (μs)</TableCell>
            <TableCell align="center">Tiempo de irrupción (μs)</TableCell>
            <TableCell align="center">Tamaño (MB)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((process, index) => (
            <TableRow
              key={process.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {process.id}
              </TableCell>

              <Tooltip
                arrow
                placement="top"
                title="Ingrese el tiempo en el que el proceso llega al sistema."
              >
                <TableCell align="center">
                  <CustomInput
                    classes={classes.inputValue}
                    placeholder={process.arrival_time}
                    value={process.arrival_time}
                    onChange={({ target: { value } }) =>
                      handleInputs(index, "arrival_time", value)
                    }
                  />
                </TableCell>
              </Tooltip>
              <Tooltip
                arrow
                placement="top"
                title="Ingrese el tiempo en el que el proceso abandona al sistema."
              >
                <TableCell align="center">
                  <CustomInput
                    classes={classes.inputValue}
                    placeholder={process.irruption_time}
                    value={process.irruption_time}
                    onChange={({ target: { value } }) =>
                      handleInputs(index, "irruption_time", value)
                    }
                  />
                </TableCell>
              </Tooltip>
              <Tooltip
                arrow
                placement="top"
                title="Ingrese el espacio en memoria que el proceso ocupará."
              >
                <TableCell align="center">
                  <CustomInput
                    classes={classes.inputValue}
                    placeholder={process.size}
                    value={process.size}
                    onChange={({ target: { value } }) =>
                      handleInputs(index, "size", value)
                    }
                  />
                </TableCell>
              </Tooltip>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
