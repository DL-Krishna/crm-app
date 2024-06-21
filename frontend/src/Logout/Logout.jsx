import { useDispatch } from 'react-redux';
import { logout } from '../Slice/AuthSlice';
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






