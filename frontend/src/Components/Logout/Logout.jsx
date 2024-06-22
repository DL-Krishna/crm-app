
// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { logout } from '../../features/auth/authSlice';
// import { useNavigate } from 'react-router-dom';

// const LogoutButton = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/'); // Redirect to login page after logout
//   };

//   return (
//     <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-gray-900">
//       Logout
//     </button>
//   );
// };

// export default LogoutButton;


// // import React from 'react';
// // import { useDispatch } from 'react-redux';
// // import { logout } from '../../features/auth/authSlice';
// // import { useHistory } from 'react-router-dom';

// // const LogoutButton = () => {
// //   const dispatch = useDispatch();
// //   const history = useHistory(); // Use useHistory hook to manage navigation

// //   const handleLogout = () => {
// //     dispatch(logout());
// //     history.push('/'); // Redirect to login page after logout using history.push
// //   };

// //   return (
// //     <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-gray-900">
// //       Logout
// //     </button>
// //   );
// // };

// // export default LogoutButton;


// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../../features/auth/authSlice';
// import { useNavigate } from 'react-router-dom';
// const LogoutButton = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { userInfo } = useSelector((state) => state.auth);
//   const handleLogout = () => {
//     dispatch(logout());
//   };
//   useEffect(() => {
//     if (!userInfo) {
//       navigate('/'); // Redirect to login page if userInfo is null
//     }
//   }, [userInfo, navigate]);
//   return (
//     <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-gray-900">
//       Logout
//     </button>
//   );
// };
// export default LogoutButton;

import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Redirect to login page after logout using navigate
  };

  return (
    <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-gray-900">
      Logout
    </button>
  );
};

export default LogoutButton;
