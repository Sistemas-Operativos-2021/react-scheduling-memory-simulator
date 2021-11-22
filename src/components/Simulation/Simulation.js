// REACT
import React, { useMemo } from "react";

// MATERIAL UI
import {
  Box,
  Divider,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Typography,
  Modal,
} from "@mui/material";

// CUSTOM COMPONENTS
import Graph from "../Graph/Graph";
import StateTable from "../StateTable/StateTable";
import MemoryTable from "../MemoryTable/MemoryTable";
import Stats from "../Stats/Stats";

// UTILS
import { runSRTF } from "../../utils/scheduleSRTF";

export default function VerticalLinearStepper({
  resetSimulation,
  processes = [],
  memoryPartitions,
}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [simulationData, setSimulationData] = React.useState([]);
  const [openStatsModal, setOpenStatsModal] = React.useState(false);

  const openStats = () => setOpenStatsModal(true);
  const closeStats = () => setOpenStatsModal(false);

  const handleNext = (index) => {
    if (index === simulationDataWithoutEmptyNewState.length - 1) {
      resetSimulation();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  React.useEffect(() => {
    const simulation = runSRTF({ processes, memoryPartitions });
    setSimulationData(simulation);
  }, [memoryPartitions, processes, processes.length]);

  const simulationDataWithoutEmptyNewState = [];
  simulationData.forEach((data) => {
    if (
      data?.newState.length > 0 ||
      (data?.runningState && data.runningState.irruption_time === 1)
    ) {
      simulationDataWithoutEmptyNewState.push(data);
    }
  });

  const stats = useMemo(() => {
    if (simulationData.length) {
      return simulationData.slice(-1)[0].finishState.map((process) => {
        const processOriginal = processes.find(
          (processOriginal) => processOriginal.id === process.id
        );
        const returnTime = process.clock - process.arrival_time;
        const waitTime = returnTime - processOriginal.irruption_time;
        return { id: process.id, waitTime, returnTime };
      });
    } else {
      return [];
    }
  }, [simulationData.length]);

  const [returnTimeAverage, waitTimeAverage] = useMemo(() => {
    if (simulationData.length) {
      const returnTimeAverageReducer = (previousValue, currentValue) =>
        previousValue + currentValue.returnTime;
      const returnTimeAverage = stats.reduce(returnTimeAverageReducer, 0);

      const waitTimeAverageReducer = (previousValue, currentValue) =>
        previousValue + currentValue.waitTime;
      const waitTimeAverage = stats.reduce(waitTimeAverageReducer, 0);
      return [returnTimeAverage / stats.length, waitTimeAverage / stats.length];
    } else {
      return [0, 0];
    }
  }, [stats.length]);
  console.log({returnTimeAverage,waitTimeAverage} );
  return (
    <Box sx={{ width: "100%" }}>
      {simulationData.length && (
        <div
          style={{
            position: "fixed",
            width: "95%",
            top: 0,
            backgroundColor: "#FFFFCC",
            zIndex: 1,
          }}
        >
          <Graph gant={simulationData.slice(-1)[0].gant} />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            <Button
              variant="contained"
              onClick={openStats}
              sx={{ mt: 1, mr: 1, alignSelf: "center" }}
            >
              Ver TRP y TEP
            </Button>
          </Box>
        </div>
      )}
      <Box marginY={8} />

      <Stepper activeStep={activeStep} orientation="vertical">
        {simulationDataWithoutEmptyNewState.map((step, index) => (
          <Step key={step.clock}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">
                    Ultimo instante de tiempo
                  </Typography>
                ) : null
              }
            >
              {String(step.clock)} u.t.
            </StepLabel>
            <StepContent sx={{ width: "100%" }}>
              {activeStep < simulationDataWithoutEmptyNewState.length && (
                <>
                  <Box sx={{ display: "flex" }}>
                    <StateTable items={step.newState} title="Estado Nuevo" />
                  </Box>
                  <Box marginY={1} />

                  <Box marginY={1} />

                  <Box sx={{ display: "flex" }}>
                    <StateTable items={step.readyState} title="Estado Listo" />
                    <Box marginX={1} />
                    <StateTable
                      items={step.readySuspendState}
                      title="Estado Listo/Suspendido"
                    />
                    <Box marginX={1} />
                    <Divider orientation="vertical" flexItem />

                    <Box marginX={1} />
                    <MemoryTable
                      width={25}
                      items={step.memory}
                      title="Estado Listo/Suspendido"
                    />
                  </Box>

                  <Box marginY={1} />

                  <Box sx={{ display: "flex" }}>
                    <StateTable
                      items={[step.runningState]}
                      title="Estado Ejecutando"
                    />
                  </Box>

                  <Box marginY={1} />
                  <Box sx={{ display: "flex" }}>
                    <StateTable
                      items={step.finishState}
                      title="Estado Finalizado"
                    />
                  </Box>
                </>
              )}

              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext.bind(null, index)}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === simulationDataWithoutEmptyNewState.length - 1
                      ? "Finalizar"
                      : "Siguiente"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Atrás
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      <Modal
        open={openStatsModal}
        onClose={closeStats}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Tiempos de retorno y espera
          </Typography>
          <Box marginY={1} />

          <Stats items={stats} />
          <Box marginY={1} />

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Tiempos de retorno y espera promedio
          </Typography>
          <Box marginY={1}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              TRP = {returnTimeAverage}
              <br />
              TEP = {waitTimeAverage}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
