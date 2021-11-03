import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Table from "../../components/Table/Table";
import MemoryTable from "../../components/MemoryTable/Table";
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: "5rem",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    height: "25%",
  },
  stepLabel: {
    "& .MuiStepLabel-label.Mui-active": {
      color: "rgba(0, 0, 0, 0.87)",
    },
    "& .MuiStepLabel-label.Mui-disabled": {
      color: "rgba(0, 0, 0, 0.87)",
      opacity: 0.7,
    },
    "& .MuiStepLabel-label.Mui-alternativeLabel": {
      color: "rgba(0, 0, 0, 0.87)",
    },
    "& .MuiStepLabel-label.Mui-completed": {
      color: "rgba(0, 0, 0, 0.87)",
    },
  },
});
const steps = ["Ingresar procesos", "Corroborar memoria"];
const newProcess = {
  id: 1,
  arrival_time: 0,
  irruption_time: 0,
  size: 0,
};

export default function HorizontalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [processes, setProcesses] = useState([newProcess]);

  const addNewProcess = () => {
    setProcesses([...processes, { ...newProcess, id: processes.length + 1 }]);
  };

  const handleInputs = (index, field, value) => {
    if (value < 0) return false;
    const processesCopy = [...processes];
    processesCopy[index][field] = value || 0;
    setProcesses(processesCopy);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const ControlButtons = () => (
    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
      <Button
        className={classes.button}
        color="primary"
        disabled={activeStep === 0}
        onClick={handleBack}
      >
        Back
      </Button>
      <Box sx={{ flex: "1 1 auto" }} />

      <Button onClick={handleNext}>
        {activeStep === steps.length - 1 ? "Finish" : "Next"}
      </Button>
    </Box>
  );

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel className={classes.stepLabel} {...labelProps}>
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              Aca pondría un simulador si tan solo tuviera uno
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                pt: 2,
                maxHeight: "40rem",
              }}
            >
              {activeStep === 0 && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    overflow: "auto",
                  }}
                >
                  <Table
                    titles={[
                      "Proceso ID",
                      "Tiempo de arribo (μs)",
                      "Tiempo de irrupción (μs)	",
                      "Tamaño (MB)",
                    ]}
                    items={processes}
                    handleInputs={handleInputs}
                  />
                  <Box marginY={1} />
                  <Button onClick={addNewProcess} variant="contained">
                    Agregar proceso
                  </Button>
                </Box>
              )}
              {activeStep === 1 && (
                <MemoryTable
                  titles={["Nombre particion", "Tamaño"]}
                  items={[
                    {
                      name: "Small",
                      usedSpace: 0,
                      size: 60,
                      isInUse: false,
                      idProcess: null,
                    },
                    {
                      name: "Medium",
                      usedSpace: 0,
                      size: 120,
                      isInUse: false,
                      idProcess: null,
                    },
                    {
                      name: "Big",
                      usedSpace: 0,
                      size: 250,
                      isInUse: false,
                      idProcess: null,
                    },
                  ]}
                />
              )}
            </Box>
            <ControlButtons />
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
