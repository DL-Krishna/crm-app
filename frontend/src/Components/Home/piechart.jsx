import { AgChartsReact } from "ag-charts-react";
import { createRoot } from "react-dom/client";
// import deepClone from "deepclone";
import getData from "./pieData";
const Piechart = () => {
  const data = getData();
  const tooltip = {
    renderer: ({ datum, angleKey }) => ({
      content: `${datum[angleKey]} Litres`,
    }),
  };
  const options = {
    container: document.getElementById("myChart"),
    title: {
      text: "Water Usage",
    },
    subtitle: {
      text: "Daily Water Usage Per Person Per Day In Litres",
    },
    series: [
      {
        data: data["cities"],
        type: "donut",
        angleKey: "value",
        sectorLabelKey: "city",
        outerRadiusRatio: 0.8,
        innerRadiusRatio: 0.6,
        fillOpacity: 0.5,
        formatter: ({ datum, fills }) => {
          const index = datum["index"];
          const colorIndex = index < 9 ? 0 : 1;
          return {
            fill: fills[colorIndex],
          };
        },
        tooltip,
      },
      {
        data: data["countries"],
        type: "donut",
        angleKey: "value",
        sectorLabelKey: "country",
        outerRadiusRatio: 0.6,
        innerRadiusRatio: 0.4,
        fillOpacity: 0.8,
        formatter: ({ datum, fills }) => {
          const index = datum["index"];
          const colorIndex = index < 3 ? 0 : 1;
          return {
            fill: fills[colorIndex],
          };
        },
        tooltip,
      },
    //   {
    //     data: data["continents"],
    //     type: "donut",
    //     angleKey: "value",
    //     sectorLabelKey: "continent",
    //     outerRadiusRatio: 0.2,
    //     innerRadiusRatio: 0.4,
    //     strokeWidth: 2,
    //     tooltip,
    //   },
    ],
  };
  return <AgChartsReact options={options} />;
};
const root = createRoot(document.getElementById("root"));
root.render(<Piechart />);
export default Piechart;


















