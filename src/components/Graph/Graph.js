import React from "react";
import Chart from "react-google-charts";

const options = {
  title: "Age vs. Weight comparison",
  hAxis: { title: "Age", viewWindow: { min: 0, max: 15 } },
  vAxis: { title: "Weight", viewWindow: { min: 0, max: 15 } },
  legend: "none",
};


const Graph = ({ gant = [] }) => {
  let processesArray = []

  if (gant.length){let lastSavedElement = gant[0];
    processesArray = [gant[0]];
  gant.forEach((process) => {
    if (process.id !== lastSavedElement.id) {
      processesArray.push(process);
      lastSavedElement = process;
    }
  });

  processesArray.forEach((process, index) => {
    if (index === processesArray.length - 1) {
      process.endClock = gant.length - 1;
    } else {
      process.endClock = processesArray[index + 1].clock;
    }
  });}

  const gantFormated = processesArray.map((process) => {
    return [
      "Estado Ejecutando",
      `P${process.id}`,
      process.clock,
      process.endClock,
    ];
  });

  return (
    !!gantFormated.length && <Chart
      width={"100%"}
      height={"100px"}
      chartType="Timeline"
      loader={<div>Loading Chart</div>}
      options={options}
      style={{ padding: "1rem 0 1rem 0" }}
      data={[
        [
          { type: "string", id: "Room" },
          { type: "string", id: "Name" },
          { type: "number", id: "Start" },
          { type: "number", id: "End" },
        ],
        ...gantFormated,
      ]}
      rootProps={{ "data-testid": "5" }}
    />
  );
};

export default Graph;
