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

  while (clock < totalClock || isSomethingRunning(runningState, readySuspendState)) {

    if (runningState && runningState?.id && runningState.irruption_time === 0) {
      
      const runningStateIndexIntoMemory = finishProcess(memory, runningState, finishState);
      resetMemory(memory, runningStateIndexIntoMemory);
      runningState = initialRunningState;
    }

    // In this line I have the new state according to the arrival time.
    const newState = configuration.processes.filter((process) => process.arrival_time === clock);

    // If there is some free space, we will check newState and readySuspendState
    if (memory.some((partition) => !partition.isInUse)) {
      // ReadySuspendState treatment: I have to check if I have free space in the RAM.
      // If I don't have enough space I will do nothing
      // Otherwise, readyState
      checkReadySuspendQueue(readySuspendState, readyState, memory);

      // NewState treatment: I have to check if I have free space in the RAM.
      // If I don't have enough space I will send the process to ReadySuspendState
      // Otherwise, readyState
      checkNewStateQueue(newState, readyState, readySuspendState, memory);
    } else {
      readySuspendState.push(...jsonifyThis(newState));
    }

    // Ready State treatment.
    const shortestITIntoReadyState = sortObjectArray(
      readyState,
      "irruption_time"
    )[0];

    // Compare irruption time between Running State and Ready State
    let shortestIT = runningState;
    if (runningState && !!shortestITIntoReadyState && !runningState.id) {
      
      shortestIT = loadProcessToCPU(readyState, shortestITIntoReadyState);

    } else if (runningState && shortestITIntoReadyState?.irruption_time < runningState.irruption_time) {

      shortestIT = loadProcessWithSwapToCPU(readyState, shortestITIntoReadyState, runningState)
    }

    runningState = shortestIT;
    if (runningState?.id) {
      
      gant.push({ ...jsonifyThis(runningState), clock });
      
    }
    simulatorEntireInformation.push({
      totalClock,
      clock,
      newState: jsonifyThis(newState),
      readySuspendState: jsonifyThis(readySuspendState),
      readyState: jsonifyThis(readyState),
      runningState: jsonifyThis(runningState || []),
      finishState: jsonifyThis(finishState),
      memory: jsonifyThis(memory),
      gant: jsonifyThis(gant),
    });
    if (runningState && runningState.id) {
      runningState.irruption_time =
        jsonifyThis(runningState).irruption_time - 1;
    }
    clock++
  };
  return simulatorEntireInformation;
};


// FUNCTIONS
function finishProcess(memory, runningState, finishState) {
  finishState.push(jsonifyThis(runningState));
  const copyOfRunningState = jsonifyThis(runningState);
  const runningStateIndexIntoMemory = memory.findIndex(
    (partition) => partition.idProcess === copyOfRunningState.id
  );
  return runningStateIndexIntoMemory;
}


function isSomethingRunning(runningState, readySuspendState) {
  return (!!runningState.id || !!readyState.length || !!readySuspendState.length);
}

function jsonifyThis(value) {
  return JSON.parse(JSON.stringify(value));
}

function resetMemory(memory, memoryIndex) {
  memory[memoryIndex].idProcess = null;
  memory[memoryIndex].isInUse = false;
  memory[memoryIndex].usedSpace =
  memory[memoryIndex].size;
}

function updateMemory(memory, memoryIndex, process) {
  memory[memoryIndex].isInUse = !memory[memoryIndex].isInUse;
  memory[memoryIndex].usedSpace = memory[memoryIndex].usedSpace + process.size;
  memory[memoryIndex].idProcess = process.id;

}

function removeFromSuspendState(readyState, readySuspendState) {
  readyState.push(jsonifyThis(process));
  const processIndexIntoReadySuspendState = readySuspendState.findIndex(
    (process) => process.id === processId
  );
  indexOfProcessesToRemoveIntoReadySuspendState.push(
    processIndexIntoReadySuspendState
  );
}

function checkReadySuspendQueue(readySuspendState, readyState, memory) {

  // ReadySuspend treatment 
  readySuspendState.forEach((process) => {
    const indexOfProcessesToRemoveIntoReadySuspendState = [];
    const { memoryIndex, processId } = bestFitPartition(memory, process);
    if (memoryIndex !== -1) {
      updateMemory(memory, memoryIndex, process);
      readyState.push(jsonifyThis(process));
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
}

function checkNewStateQueue(newState, readyState, readySuspendState, memory) {
  newState.forEach((process) => {
    const { memoryIndex } = bestFitPartition(memory, process);
    if (memoryIndex !== -1) {
      updateMemory(memory, memoryIndex, process)
      readyState.push(jsonifyThis(process));
    } else {
      readySuspendState.push(jsonifyThis(process));
    }
  });
}

function loadProcessToCPU(readyState, shortestITIntoReadyState) {
  const shortestIT = shortestITIntoReadyState;
  const runningStateIndexIntoReadyState = readyState.findIndex(
    (process) => process.id === shortestIT.id
  );
  if (runningStateIndexIntoReadyState !== -1) {
    readyState.splice(runningStateIndexIntoReadyState, 1);
  }
  return shortestIT;
}

function loadProcessWithSwapToCPU(readyState, shortestITIntoReadyState, runningState) {

  readyState.push(jsonifyThis(runningState));

  const shortestIT = shortestITIntoReadyState;
  const runningStateIndexIntoReadyState = readyState.findIndex(
    (process) => process.id === shortestIT.id
  );
  if (runningStateIndexIntoReadyState !== -1) {
    readyState.splice(runningStateIndexIntoReadyState, 1);
  }
  return shortestIT;
}



