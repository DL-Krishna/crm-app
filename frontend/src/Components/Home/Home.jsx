// import React from "react";
// import Navbar from "../Navbar/Navbar";
// import { MdOutlineGroups } from "react-icons/md";
// import Bar from "./Bar";
// import Piechart from "./Piechart";
// import Linechart from "./Linechart";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { fetchLeadStatistics } from "../../features/leads/statistics";

// const Home = () => {
//   const dispatch = useDispatch();
//   const leadStatistics = useSelector((state) => state.leadStatistics);

//   useEffect(() => {
//     dispatch(fetchLeadStatistics());
//   }, [dispatch]);

//   return (
//     <div className="bg-gray-100 h-screen w-screen  ">
//       {/* <Navbar /> */}
//       <div className="py-8 ps-10 pt-28">
//         <div className="flex flex-wrap ">
//           <div className="bg-purple-100 shadow-lg rounded-xl ps-4 h-24 w-64 flex m-3  space-x-3 items-center">
//             <MdOutlineGroups className=" size-14 bg-gray-100 text-blue-700 p-3 rounded-full " />
//             <div className="">
//               <div className="text-md  font-semibold text-gray-400">Leads</div>
//               <div className="text-2xl font-bold">350</div>
//             </div>
//           </div>
//           <div className="bg-purple-100 shadow-lg rounded-xl ps-4 h-24 w-64 flex m-3  space-x-3 items-center">
//             <MdOutlineGroups className=" size-14 bg-gray-100 text-blue-700 p-3 rounded-full " />
//             <div className="">
//               <div className="text-md  font-semibold text-gray-400">
//                 Contacted
//               </div>
//               <div className="text-2xl font-bold">64</div>
//             </div>
//           </div>
//           <div className="bg-purple-100 shadow-lg rounded-xl ps-4 h-24 w-64 flex m-3  space-x-3 items-center">
//             <MdOutlineGroups className=" size-14 bg-gray-100 text-blue-700 p-3 rounded-full " />
//             <div className="">
//               <div className="text-md  font-semibold text-gray-400">
//                 Not Contacted
//               </div>
//               <div className="text-2xl font-bold">286</div>
//             </div>
//           </div>
//           <div className="bg-purple-100 shadow-lg rounded-xl ps-4 h-24 w-64 flex m-3  space-x-3 items-center">
//             <MdOutlineGroups className=" size-14 bg-gray-100 text-blue-700 p-3 rounded-full " />
//             <div className="">
//               <div className="text-md  font-semibold text-gray-400">
//                 Opportunities
//               </div>
//               <div className="text-2xl font-bold">24</div>
//             </div>
//           </div>
//           <div className="bg-purple-100 shadow-lg rounded-xl ps-4 h-24 w-64 flex m-3  space-x-3 items-center">
//             <MdOutlineGroups className=" size-14 bg-gray-100 text-blue-700 p-3 rounded-full " />
//             <div className="">
//               <div className="text-md  font-semibold text-gray-400">
//                 Learners
//               </div>
//               <div className="text-2xl font-bold">15</div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* <div className="h-96 w-96 my-8 mx-10  ">
//         <Bar/>
//         <Piechart/>
//       </div> */}
//       <div className="h-3/5 flex mx-10 items-center">
//         <div className="w-2/3 h-full p-4">
//           <Linechart />
//         </div>
//         <div className="w-1/3 h-full p-4">
//           <Piechart />
//         </div>
//       </div>
//       <div>
//         {leadStatistics.status === "loading" && <p>Loading...</p>}
//         {leadStatistics.status === "succeeded" && (
//           <pre>{JSON.stringify(leadStatistics.data, null, 2)}</pre>
//         )}
//         {leadStatistics.status === "failed" && (
//           <p>Error: {leadStatistics.error}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;


// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchLeadStatistics } from "../../features/leads/statistics";
// import Navbar from "../Navbar/Navbar";
// import { MdOutlineGroups } from "react-icons/md";
// import Bar from "./Bar";
// import Piechart from "./Piechart";
// import Linechart from "./Linechart";

// const Home = () => {

//   return (
//     <div className="bg-gray-100 h-screen w-screen">
//       {/* <Navbar /> */}
//       <div className="py-8 ps-10 pt-28">
//         <div className="flex flex-wrap">
//           <div className="bg-purple-100 shadow-lg rounded-xl ps-4 h-24 w-64 flex m-3 space-x-3 items-center">
//             <MdOutlineGroups className="size-14 bg-gray-100 text-blue-700 p-3 rounded-full" />
//             <div>
//               <div className="text-md font-semibold text-gray-400">Leads</div>
//               <div className="text-2xl font-bold">350</div>
//             </div>
//           </div>
//           <div className="bg-purple-100 shadow-lg rounded-xl ps-4 h-24 w-64 flex m-3 space-x-3 items-center">
//             <MdOutlineGroups className="size-14 bg-gray-100 text-blue-700 p-3 rounded-full" />
//             <div>
//               <div className="text-md font-semibold text-gray-400">Contacted</div>
//               <div className="text-2xl font-bold">64</div>
//             </div>
//           </div>
//           <div className="bg-purple-100 shadow-lg rounded-xl ps-4 h-24 w-64 flex m-3 space-x-3 items-center">
//             <MdOutlineGroups className="size-14 bg-gray-100 text-blue-700 p-3 rounded-full" />
//             <div>
//               <div className="text-md font-semibold text-gray-400">Not Contacted</div>
//               <div className="text-2xl font-bold">286</div>
//             </div>
//           </div>
//           <div className="bg-purple-100 shadow-lg rounded-xl ps-4 h-24 w-64 flex m-3 space-x-3 items-center">
//             <MdOutlineGroups className="size-14 bg-gray-100 text-blue-700 p-3 rounded-full" />
//             <div>
//               <div className="text-md font-semibold text-gray-400">Opportunities</div>
//               <div className="text-2xl font-bold">24</div>
//             </div>
//           </div>
//           <div className="bg-purple-100 shadow-lg rounded-xl ps-4 h-24 w-64 flex m-3 space-x-3 items-center">
//             <MdOutlineGroups className="size-14 bg-gray-100 text-blue-700 p-3 rounded-full" />
//             <div>
//               <div className="text-md font-semibold text-gray-400">Learners</div>
//               <div className="text-2xl font-bold">15</div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="h-3/5 flex mx-10 items-center">
//         <div className="w-2/3 h-full p-4">
//           <Linechart />
//         </div>
//         <div className="w-1/3 h-full p-4">
//           <Piechart />
//         </div>
//       </div>
      
//     </div>
//   );
// };

// export default Home;


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchLeadStatistics } from "../../features/leads/statistics";
import Navbar from "../Navbar/Navbar";
import { MdOutlineGroups } from "react-icons/md";
// import Bar from "./Bar";
// import Piechart from "./Piechart";
// import Linechart from "./Linechart";

const Home = () => {
  // const dispatch = useDispatch();
  // const { token } = useSelector((state) => state.auth);
  // const { data, status } = useSelector((state) => state.leadStatistics);

  // useEffect(() => {
  //   if (token) {
  //     dispatch(fetchLeadStatistics());
  //   }
  // }, [token, dispatch]);

  return (
    <div className="bg-gray-100 h-screen w-screen">
      <div className="py-8 ps-10 pt-28">
        <div className="flex flex-wrap">
          <div className="bg-purple-100 shadow-lg rounded-xl ps-4 h-24 w-64 flex m-3 space-x-3 items-center">
            <MdOutlineGroups className="size-14 bg-gray-100 text-blue-700 p-3 rounded-full" />
            <div>
              <div className="text-md font-semibold text-gray-400">Leads</div>
              {/* <div className="text-2xl font-bold">{data?.totalLeads || 0}</div> */}
            </div>
          </div>
          <div className="bg-purple-100 shadow-lg rounded-xl ps-4 h-24 w-64 flex m-3 space-x-3 items-center">
            <MdOutlineGroups className="size-14 bg-gray-100 text-blue-700 p-3 rounded-full" />
            <div>
              <div className="text-md font-semibold text-gray-400">Contacted</div>
              {/* <div className="text-2xl font-bold">{data?.contactedLeads || 0}</div> */}
            </div>
          </div>
          <div className="bg-purple-100 shadow-lg rounded-xl ps-4 h-24 w-64 flex m-3 space-x-3 items-center">
            <MdOutlineGroups className="size-14 bg-gray-100 text-blue-700 p-3 rounded-full" />
            <div>
              <div className="text-md font-semibold text-gray-400">Not Contacted</div>
              {/* <div className="text-2xl font-bold">{data?.notContactedLeads || 0}</div> */}
            </div>
          </div>
          <div className="bg-purple-100 shadow-lg rounded-xl ps-4 h-24 w-64 flex m-3 space-x-3 items-center">
            <MdOutlineGroups className="size-14 bg-gray-100 text-blue-700 p-3 rounded-full" />
            <div>
              <div className="text-md font-semibold text-gray-400">Opportunities</div>
              {/* <div className="text-2xl font-bold">{data?.opportunities || 0}</div> */}
            </div>
          </div>
          <div className="bg-purple-100 shadow-lg rounded-xl ps-4 h-24 w-64 flex m-3 space-x-3 items-center">
            <MdOutlineGroups className="size-14 bg-gray-100 text-blue-700 p-3 rounded-full" />
            <div>
              <div className="text-md font-semibold text-gray-400">Learners</div>
              {/* <div className="text-2xl font-bold">{data?.learners || 0}</div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="h-3/5 flex mx-10 items-center">
        <div className="w-2/3 h-full p-4">
          {/* <Linechart /> */}
        </div>
        <div className="w-1/3 h-full p-4">
          {/* <Piechart /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
