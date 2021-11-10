import bestFitPartition from "./bestFit";
import sortObjectArray from "./sortObjectArray";
import sortProcessesArrayByTA from "./sortProcessesArrayByTA";

const initialRunningState = {
  id: null,
  arrival_time: null,
  irruption_time: null,
  size: null,
};

export const runSRTF = (configuration) => {
  const simulatorEntireInformation = [];
  const processesOrderedByTA = sortProcessesArrayByTA(configuration.processes);
  const totalClock = processesOrderedByTA.reduce(
    (acc, current) => acc + current.irruption_time,
    0
  );
  const memory = [...configuration.memoryPartitions];

  const readyState = [];
  const readySuspendState = [];
  const finishState = [];
  const gant = [];
  let runningState = {
    id: null,
    arrival_time: null,
    irruption_time: null,
    size: null,
  };
  let clock = 0;
  while (clock < totalClock || (!!runningState.id || !!readyState.length || !!readySuspendState.length)) {
    if (runningState && runningState?.id && runningState.irruption_time === 0) {
      finishState.push(JSON.parse(JSON.stringify(runningState)));
      const copyOfRunningState = JSON.parse(JSON.stringify(runningState));
      const runningStateIndexIntoMemory = memory.findIndex(
        (partition) => partition.idProcess === copyOfRunningState.id
      );
      memory[runningStateIndexIntoMemory].idProcess = null;
      memory[runningStateIndexIntoMemory].isInUse = false;
      memory[runningStateIndexIntoMemory].usedSpace =
        memory[runningStateIndexIntoMemory].size;
      runningState = initialRunningState;
    }

    // In this line I have the new state according to the arrival time.
    const newState = configuration.processes.filter(
      (process) => process.arrival_time === clock
    );
    // If there is some free space, we will check newState and readySuspendState
    if (memory.some((partition) => !partition.isInUse)) {
      // ReadySuspendState treatment: I have to check if I have free space in the RAM.
      // If I don't have enough space I will do nothing
      // Otherwise, readyState
      const indexOfProcessesToRemoveIntoReadySuspendState = [];
      readySuspendState.forEach((process) => {
        const { memoryIndex, processId } = bestFitPartition(memory, process);
        if (memoryIndex !== -1) {
          memory[memoryIndex].isInUse = !memory[memoryIndex].isInUse;
          memory[memoryIndex].usedSpace =
            memory[memoryIndex].usedSpace + process.size;
          memory[memoryIndex].idProcess = process.id;
          readyState.push(JSON.parse(JSON.stringify(process)));
          const processIndexIntoReadySuspendState = readySuspendState.findIndex(
            (process) => process.id === processId
          );
          indexOfProcessesToRemoveIntoReadySuspendState.push(
            processIndexIntoReadySuspendState
          );
        }
      });
      indexOfProcessesToRemoveIntoReadySuspendState.forEach((processIndex) =>
        readySuspendState.splice(processIndex, 1)
      );

      // NewState treatment: I have to check if I have free space in the RAM.
      // If I don't have enough space I will send the process to ReadySuspendState
      // Otherwise, readyState
      newState.forEach((process) => {
        const { memoryIndex } = bestFitPartition(memory, process);

        if (memoryIndex !== -1) {
          memory[memoryIndex].isInUse = !memory[memoryIndex].isInUse;
          memory[memoryIndex].usedSpace =
            memory[memoryIndex].usedSpace + process.size;
          memory[memoryIndex].idProcess = process.id;
          readyState.push(JSON.parse(JSON.stringify(process)));
        } else {
          readySuspendState.push(JSON.parse(JSON.stringify(process)));
        }
      });
    } else {
      readySuspendState.push(...JSON.parse(JSON.stringify(newState)));
    }

    // Ready State treatment.

    const shortestITIntoReadyState = sortObjectArray(
      readyState,
      "irruption_time"
    )[0];

    // Compare irruption time between Running State and Ready State
    let shortestIT = runningState;
    if (runningState && !!shortestITIntoReadyState && !runningState.id) {
      shortestIT = shortestITIntoReadyState;

      const runningStateIndexIntoReadyState = readyState.findIndex(
        (process) => process.id === shortestIT.id
      );
      if (runningStateIndexIntoReadyState !== -1) {
        readyState.splice(runningStateIndexIntoReadyState, 1);
      }
    } else if (
      runningState &&
      shortestITIntoReadyState?.irruption_time < runningState.irruption_time
    ) {
      readyState.push(JSON.parse(JSON.stringify(runningState)));

      shortestIT = shortestITIntoReadyState;
      const runningStateIndexIntoReadyState = readyState.findIndex(
        (process) => process.id === shortestIT.id
      );
      if (runningStateIndexIntoReadyState !== -1) {
        readyState.splice(runningStateIndexIntoReadyState, 1);
      }
    }

    runningState = shortestIT;
    gant.push({ ...JSON.parse(JSON.stringify(runningState)), clock });
      
    
    simulatorEntireInformation.push({
      totalClock,
      clock,
      newState: JSON.parse(JSON.stringify(newState)),
      readySuspendState: JSON.parse(JSON.stringify(readySuspendState)),
      readyState: JSON.parse(JSON.stringify(readyState)),
      runningState: JSON.parse(JSON.stringify(runningState)),
      finishState: JSON.parse(JSON.stringify(finishState)),
      memory: JSON.parse(JSON.stringify(memory)),
      gant: JSON.parse(JSON.stringify(gant)),
    });
    if (runningState && runningState.id) {
      runningState.irruption_time =
        JSON.parse(JSON.stringify(runningState)).irruption_time - 1;
    }
    clock++
  }

  return simulatorEntireInformation;
};
