// import React, { Fragment, useState } from "react";
// import { createRoot } from "react-dom/client";
// import { AgChartsReact } from "ag-charts-react";
// // import deepClone from "deepclone";
// import getData from "./data";

// const Bar = () => {
//   const [options, setOptions] = useState({
//     title: {
//       text: "Mode of Teaching ",
//     },
    
//     data: getData(),
//     series: [
//       {
//         type: "bar",
//         xKey: "course",
//         yKey: "online",
//         yName: "online",
//         stacked:true
//       },
//       {
//         type: "bar",
//         xKey: "course",
//         yKey: "offline",
//         yName: "offline",
//         stacked:true
//       },
      
//     ],
//   });

//   return <AgChartsReact options={options} />;
// };

// const root = createRoot(document.getElementById("root"));
// root.render(<Bar/>);

// export default Bar