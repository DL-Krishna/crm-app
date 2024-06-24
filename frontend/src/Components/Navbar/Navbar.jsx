// import React from "react";
// import logo from "../../assets/digital_lync.png";
// import { GoBell } from "react-icons/go";
// import { CgProfile } from "react-icons/cg";
// import { NavLink } from 'react-router-dom';
// import LogoutButton from "../Logout/Logout";

// // const Navbar = () => {
// //   return (
// //     <div>
// //       <nav className="bg-white-900 shadow-lg w-screen">
// //         <div className="  flex items-center justify-between">
// //           <div className="items-center ms-6">
// //             <a href="/home" className="">
// //               <img src={logo} />
// //             </a>
// //           </div>
// //           <div className="flex items-center ">
// //             <ul className="hidden md:flex py-6 space-x-2 text-xl me-6">
// //               <li>
// //                 <a href="/home" className="py-4 px-4 hover:bg-red-100 hover:border-b-2 hover:border-b-red-500">
// //                   Home
// //                 </a>
// //               </li>
// //               <li>
// //                 <a href="/leads" className="py-4 px-4 hover:bg-red-100 hover:border-b-2 hover:border-b-red-500">
// //                   Leads
// //                 </a>
// //               </li>
// //               <li>
// //                 <a href="#" className="py-4 px-4 hover:bg-red-100 hover:border-b-2 hover:border-b-red-500">
// //                   Opportunities
// //                 </a>
// //               </li>
// //               <li>
// //                 <a href="#" className="py-4 px-4 hover:bg-red-100 hover:border-b-2 hover:border-b-red-500">
// //                   Learners
// //                 </a>
// //               </li>
// //               <li>
// //                 <a href="#" className="py-4 px-4 hover:bg-red-100 hover:border-b-2 hover:border-b-red-500">
// //                   Courses
// //                 </a>
// //               </li>
// //               <li>
// //                 <a href="#" className="py-4 px-4 hover:bg-red-100 hover:border-b-2 hover:border-b-red-500">
// //                   Activities
// //                 </a>
// //               </li>
// //               <li>
// //                 <a href="#" className="py-4 px-4 hover:bg-red-100 hover:border-b-2 hover:border-b-red-500">
// //                   Analytics
// //                 </a>
// //               </li>
// //             </ul>
// //             <ul className="flex mx-6 space-x-4">
// //                <GoBell className=" cursor-pointer size-7" />
// //                <CgProfile className=" cursor-pointer size-7" />
// //             </ul>
// //           </div>
// //         </div>
// //       </nav>
// //     </div>
// //   );
// // };

// // export default Navbar;


import React from "react";
import logo from "../../assets/digital_lync.png";
import { GoBell } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { NavLink } from 'react-router-dom';
import LogoutButton from "../Logout/Logout";

const NavBar = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-lg z-10">
      <nav className='py-4'>
        <div className='flex items-center justify-between mx-6'>
          <div className='flex items-center'>
            <a href='/home' className='flex items-center'>
              <img src={logo} className="h-14" alt="SkillCapital Logo" />
            </a>
          </div>
          <div className='flex'>
            <ul className='hidden md:flex space-x-4 text-lg'>
              <li>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    isActive ? "py-4 px-4 border-b-2 border-blue-500 bg-blue-100" : "py-4 px-4 hover:border-b-2 hover:border-blue-500"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/leads"
                  className={({ isActive }) =>
                    isActive ? "py-4 px-4 border-b-2 border-blue-500 bg-blue-100" : "py-4 px-4 hover:border-b-2 hover:border-blue-500"
                  }
                >
                  Leads
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/opportunities"
                  className={({ isActive }) =>
                    isActive ? "py-4 px-4 border-b-2 border-blue-500 bg-blue-100" : "py-4 px-4 hover:border-b-2 hover:border-blue-500"
                  }
                >
                  Opportunities
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to="/learners"
                  className={({ isActive }) =>
                    isActive ? "py-4 px-4 border-b-2 border-blue-500 bg-blue-100" : "py-4 px-4 hover:border-b-2 hover:border-blue-500"
                  }
                >
                  Learners
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/courses"
                  className={({ isActive }) =>
                    isActive ? "py-4 px-4 border-b-2 border-blue-500 bg-blue-100" : "py-4 px-4 hover:border-b-2 hover:border-blue-500"
                  }
                >
                  Courses
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/activities"
                  className={({ isActive }) =>
                    isActive ? "py-4 px-4 border-b-2 border-blue-500 bg-blue-100" : "py-4 px-4 hover:border-b-2 hover:border-blue-500"
                  }
                >
                  Activities
                </NavLink>
              </li> */}
              {/* <li>
                <NavLink
                  to="/analytics"
                  className={({ isActive }) =>
                    isActive ? "py-4 px-4 border-b-2 border-blue-500 bg-blue-100" : "py-4 px-4 hover:border-b-2 hover-border-blue-500"
                  }
                >
                  Analytics
                </NavLink>
              </li> */}
            </ul>
            <ul className='flex items-center space-x-2'>
              <GoBell className='cursor-pointer text-2xl' />
              <CgProfile className='cursor-pointer text-2xl' />
              <LogoutButton />
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
