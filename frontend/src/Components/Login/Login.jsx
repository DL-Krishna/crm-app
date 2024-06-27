
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { login } from '../../features/auth/authSlice';
// import logo from "../../assets/digital_lync.png";
// import poster from "../../assets/CRMVector.png";

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { status, error, token } = useSelector((state) => state.auth);

//   const [credentials, setCredentials] = useState({
//     username: '',
//     password: ''
//   });

//   useEffect(() => {
//     if (token) {
//       navigate('/home');
//     }
//   }, [token, navigate]);

//   useEffect(() => {
//     if (status === 'succeeded') {
//       toast.success('Login successful!');
//     } else if (status === 'failed') {
//       toast.error(`Error: ${error.message}`);
//     }
//   }, [status, error]);

//   const handleChange = (e) => {
//     setCredentials({
//       ...credentials,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(login(credentials));
//   };

//   return (
//     <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
//       <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-4">
//         <div className="logo flex justify-center mt-8 md:mt-0">
//           <img src={logo} alt="skillcapital.png" className="" />
//         </div>
//         <form onSubmit={handleSubmit} className="login-form mt-8 md:mt-12 border border-gray-300 p-6 shadow-lg rounded-lg w-full max-w-md">
//           <label className="block text-sm font-semibold leading-6 text-gray-900">
//             User Name
//           </label>
//           <input
//             id="username"
//             name="username"
//             type="text"
//             value={credentials.username}
//             onChange={handleChange}
//             required
//             className="block w-full rounded-lg border border-gray-300 p-1.5 text-gray-900 focus:border-sky-500 focus:outline-none h-12 sm:text-sm sm:leading-6"
//           />
//           <label className="block mt-6 text-sm font-semibold leading-6 text-gray-900">
//             Password
//           </label>
//           <input
//             id="password"
//             name="password"
//             type="password"
//             value={credentials.password}
//             onChange={handleChange}
//             required
//             className="block w-full rounded-lg border border-gray-300 p-1.5 text-gray-900 focus:border-sky-500 focus:outline-none h-12 sm:text-sm sm:leading-6"
//           />
//           <button 
//             type="submit"
//             className="flex w-full mt-10 justify-center rounded-lg  bg-blue-600 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           >
//             Login
//           </button>
//           {status === 'loading' && <p>Loading...</p>}
//           <div className="flex gap-2 mt-8">
//             <input type="checkbox" className="h-5 w-5" />
//             <span className="font-normal text-sm text-gray-600">Remember Me</span>
//           </div>
//           <span className="text-gray-500 text-sm font-medium mt-8 md:mt-24 text-center block">©2024, All rights reserved</span>
//         </form>
//       </div>
//       <div className="hidden md:flex flex-col w-1/2 items-center justify-center ">
//         <div className="text-center">
//           <h1 className="text-2xl md:text-3xl mt-12 px-4 md:px-28 font-bold text-[#042D60]">
//           Manage all your customers data in one place
//           </h1>
//           <p className="text-lg md:text-xl px-4 md:px-20 text-[#042D60] mt-4">
//           Centralize customer data effortlessly. Streamline communication, sales, and support for seamless growth.
//           </p>
//         </div>
//         <div className="relative w-full h-full mt-6 flex items-center justify-center">
//           <img className="h-full w-full object-cover" src={poster} alt="crm.png" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../features/auth/authSlice';
import logo from "../../assets/digital_lync.png";
import poster from "../../assets/CRMVector.png";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const { status, error, token } = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {
    if (token) {
      navigate('/home');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (status === 'succeeded') {
      toast.success('Login successful!');
      setIsLoading(false); // End loading on success
    } else if (status === 'failed') {
      toast.error(`Error: ${error.message}`);
      setIsLoading(false); // End loading on error
    }
  }, [status, error]);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading when submit is clicked
    dispatch(login(credentials));
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-4">
        <div className="logo flex justify-center mt-8 md:mt-0">
          <img src={logo} alt="skillcapital.png" className="" />
        </div>
        <form onSubmit={handleSubmit} className="login-form mt-8 md:mt-12 border border-gray-300 p-6 shadow-lg rounded-lg w-full max-w-md">
          <label className="block text-sm font-semibold leading-6 text-gray-900">
            User Name
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={credentials.username}
            onChange={handleChange}
            required
            className="block w-full rounded-lg border border-gray-300 p-1.5 text-gray-900 focus:border-sky-500 focus:outline-none h-12 sm:text-sm sm:leading-6"
          />
          <label className="block mt-6 text-sm font-semibold leading-6 text-gray-900">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            required
            className="block w-full rounded-lg border border-gray-300 p-1.5 text-gray-900 focus:border-sky-500 focus:outline-none h-12 sm:text-sm sm:leading-6"
          />
          <button 
            type="submit"
            className="flex w-full mt-10 justify-center rounded-lg bg-blue-600 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={isLoading} // Disable the button while loading
          >
            {isLoading && (
              <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
            )}
            Login
          </button>
          <div className="flex gap-2 mt-8">
            <input type="checkbox" className="h-5 w-5" />
            <span className="font-normal text-sm text-gray-600">Remember Me</span>
          </div>
          <span className="text-gray-500 text-sm font-medium mt-8 md:mt-24 text-center block">©2024, All rights reserved</span>
        </form>
      </div>
      <div className="hidden md:flex flex-col w-1/2 items-center justify-center ">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl mt-12 px-4 md:px-28 font-bold text-[#042D60]">
            Manage all your customers data in one place
          </h1>
          <p className="text-lg md:text-xl px-4 md:px-20 text-[#042D60] mt-4">
            Centralize customer data effortlessly. Streamline communication, sales, and support for seamless growth.
          </p>
        </div>
        <div className="relative w-full h-full mt-6 flex items-center justify-center">
          <img className="h-full w-full object-cover" src={poster} alt="crm.png" />
        </div>
      </div>
    </div>
  );
};

export default Login;
