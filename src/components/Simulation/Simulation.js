import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Graph from "../Graph/Graph";
import StateTable from "../StateTable/StateTable";
import MemoryTable from "../MemoryTable/MemoryTable";

import { simulatorInformation } from "./dummy";
import { runSRTF } from "../../utils/scheduleSRTF";

export default function VerticalLinearStepper({ resetSimulation, processes=[], memoryPartitions }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [simulationData, setSimulationData] = React.useState([]);

  console.log({simulationData})
  const handleNext = (index) => {
    if (index === simulationData.length - 1) {
      resetSimulation();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  React.useEffect(() => {
      const simulation = runSRTF({ processes, memoryPartitions });
      setSimulationData(simulation)
    
  }, [processes.length]);

console.log(simulationData)
  return (
    <Box sx={{ width: "100%" }}>
      {simulationData.length && <div
        style={{
          position: "fixed",
          width: "95%",
          top: 0,
          backgroundColor: "#FFFFCC",
          zIndex: 1,
        }}
      >
        <Graph  gant={simulationData.slice(-1)[0].gant} />
      </div>}
      <Box marginY={8} />

      <Stepper activeStep={activeStep} orientation="vertical">
        {simulationData.map((step, index) => (
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
              {activeStep < simulationData.length && (
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
                    {index === simulationData.length - 1 ? "Finalizar" : "Siguiente"}
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
    </Box>
  );
}
