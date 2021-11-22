// REACT
import React, { useState } from "react";

// MATERIAL UI
import { Box, Stepper, Step, StepLabel, Button } from "@mui/material";
import useStyles from "./styles";

// CUSTOM COMPONENTS
import Table from "../../components/Table/Table";
import MemoryTable from "../../components/MemoryTable/MemoryTable";
import Simulation from "../../components/Simulation/Simulation";

// UTILS
import { memoryPartitions } from "./memoryPartitions";
const steps = ["Ingresar procesos", "Información sobre memoria"];
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

  const existProcessHuge = React.useMemo(() => {
    return processes.find((process) => process.size > 250);
  }, [processes]);

  const emptyData = React.useMemo(() => {
    return processes.some(
      (process) => !(process.irruption_time && process.size)
    );
  }, [processes]);

  const addNewProcess = () => {
    setProcesses([
      ...processes,
      {
        ...newProcess,
        id: processes.length + 1,
        arrival_time: 0,
        irruption_time: 0,
        size: 0,
      },
    ]);
  };

  const handleInputs = (index, field, value) => {
    if (value < 0) return false;
    const processesCopy = [...processes];
    processesCopy[index][field] = Number(value) || 0;
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
        Atrás
      </Button>
      <Box sx={{ flex: "1 1 auto" }} />

      <Button onClick={handleNext} disabled={emptyData}>
        {activeStep === steps.length - 1 ? "Correr simulacion" : "Siguiente"}
      </Button>
    </Box>
  );

  const onDelete = (index) => {
    const processesCopy = JSON.parse(JSON.stringify(processes));
    processesCopy.splice(index, 1);
    setProcesses(processesCopy);
  };

  React.useEffect(() => {
    const table = document.getElementById("scrollfortablecontainer");
    if (!!table.scrollHeight) {
      table.scrollTop = table.scrollHeight;
    }
  }, [processes.length]);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {activeStep === steps.length ? (
          <Simulation
            resetSimulation={handleReset}
            memoryPartitions={memoryPartitions}
            processes={processes}
          />
        ) : (
          <>
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
                      maxHeight: 500,
                      overflowY: "auto",
                    }}
                  >
                    <Table
                      onDelete={onDelete}
                      titles={[
                        "Proceso ID",
                        "Tiempo de arribo (u.t.)",
                        "Tiempo de irrupción (u.t.)	",
                        "Tamaño (KB)",
                      ]}
                      existProcessHuge={existProcessHuge}
                      items={processes}
                      handleInputs={handleInputs}
                    />
                    <Box marginY={1} />
                    <Button
                      disabled={existProcessHuge}
                      onClick={addNewProcess}
                      variant="contained"
                    >
                      Agregar proceso
                    </Button>
                  </Box>
                )}
                {activeStep === 1 && (
                  <MemoryTable
                    width={100}
                    titles={["Nombre particion", "Tamaño"]}
                    items={memoryPartitions}
                  />
                )}
              </Box>
              <ControlButtons />
            </React.Fragment>
          </>
        )}
      </div>
    </div>
  );
}
