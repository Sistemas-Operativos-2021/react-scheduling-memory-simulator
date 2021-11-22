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
  handleInputs,
  onDelete,
  existProcessHuge = false,
}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} id="scrollfortablecontainer">
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Proceso ID</TableCell>
            <TableCell align="center">Tiempo de arribo (u.t.)</TableCell>
            <TableCell align="center">Tiempo de irrupción (u.t.)</TableCell>
            <TableCell align="center">Tamaño (KB)</TableCell>
            <TableCell align="center"></TableCell>
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
              <TableCell align="center">
                <Button disabled={index === 0} onClick={() => onDelete(index)}>
                  <Delete />
                </Button>
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
