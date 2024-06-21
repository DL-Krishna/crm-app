import { MdOutlineGroups } from "react-icons/md";
import Piechart from "./piechart";
import Linechart from "./Linechart";
const Home = () => {
  

  return (
    <div className="h-screen bg-gray-100 w-screen">
      <div className="mx-10 py-10 pt-28">
        <div className="flex flex-wrap">
          <div className="bg-white shadow-lg rounded-xl ps-4 h-24 w-64 flex m-3 space-x-3 items-center">
            <MdOutlineGroups className="size-14 bg-gray-100 text-blue-700 p-3 rounded-full" />
            <div className="">
              <div className="text-md font-semibold text-gray-400">Leads</div>
              <div className="text-2xl font-bold">350</div>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-xl ps-4 h-24 w-64 flex m-3 space-x-3 items-center">
            <MdOutlineGroups className="size-14 bg-gray-100 text-blue-700 p-3 rounded-full" />
            <div className="">
              <div className="text-md font-semibold text-gray-400">Contacted</div>
              <div className="text-2xl font-bold">64</div>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-xl ps-4 h-24 w-64 flex m-3 space-x-3 items-center">
            <MdOutlineGroups className="size-14 bg-gray-100 text-blue-700 p-3 rounded-full" />
            <div className="">
              <div className="text-md font-semibold text-gray-400">Not Contacted</div>
              <div className="text-2xl font-bold">286</div>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-xl ps-4 h-24 w-64 flex m-3 space-x-3 items-center">
            <MdOutlineGroups className="size-14 bg-gray-100 text-blue-700 p-3 rounded-full" />
            <div className="">
              <div className="text-md font-semibold text-gray-400">Opportunities</div>
              <div className="text-2xl font-bold">24</div>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-xl ps-4 h-24 w-64 flex m-3 space-x-3 items-center">
            <MdOutlineGroups className="size-14 bg-gray-100 text-blue-700 p-3 rounded-full" />
            <div className="">
              <div className="text-md font-semibold text-gray-400">Learners</div>
              <div className="text-2xl font-bold">15</div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-2/3 flex mx-10 items-center">
        <div className="w-2/3 h-full p-4">
          {/* <AgChartsReact options={options} /> */}
          <Linechart/>
        </div>
        <div className="w-1/3 h-full p-4">
          <Piechart/>
        </div>
      </div>
    </div>
  );
};

export default Home;
