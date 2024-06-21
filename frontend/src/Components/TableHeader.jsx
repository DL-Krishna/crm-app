// eslint-disable-next-line no-unused-vars
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { useLocation } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const TableHeader = ({ onCreateLead, onSearch, onDelete }) => {
  const location = useLocation();
  const isLeadsPage = location.pathname === "/leads";
  const isLearnersPage = location.pathname === "/learners";
  const headerText = isLeadsPage ? "All Leads" : isLearnersPage ? "All Learners" : "All Courses";
  const buttonText = isLeadsPage ? "Create Lead" : isLearnersPage ? "Create Learner" : "Create Course";
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex">
          <h1 className="text-2xl font-medium ">{headerText}</h1>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold ">
                <MdKeyboardArrowDown
                  className="-mr-1 h-6 w-6"
                  aria-hidden="true"
                />
              </MenuButton>
            </div>
          </Menu>
        </div>
        <div className="flex h-8 space-x-2">
          <button
            onClick={onCreateLead}
            className="bg-blue-500 text-white px-4 py-0 rounded-md text-sm"
          >
            {buttonText}
          </button>
          <button
            onClick={onDelete}
            className="border bg-red-500 text-white px-4 py-0 rounded-md text-sm"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="relative mt-2 w-72 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">
            <CiSearch />
          </span>
        </div>
        <input
          type="text"
          name="search"
          id="search"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
          placeholder="Search"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};
export default TableHeader;







