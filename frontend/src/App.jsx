import { useState } from 'react';
import FacialExpression from "./components/FacialExpression";
import MoodSongs from './components/MoodSongs';
import AuthForm from './components/appAuth';
import Navbar from './components/Navbar';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function App() {
  const [songs, setSongs] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

const handleLogout = async () => {
  try {
    const res = await axios.post('/auth/logout', {}, { withCredentials: true });
    console.log(res.data); // Debug
    toast.success("Logged out");
    setIsAuthenticated(false); // 👈 Logout in UI too
  } catch (err) {
    console.error("Logout failed", err.response?.status, err.response?.data);
    toast.error("Logout failed: " + (err.response?.data?.message || "Check console"));
  }
};

  return (
    <>
      <ToastContainer position="top-center" />
      {!isAuthenticated ? (
        <AuthForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <Navbar handleLogout={handleLogout} />
          <FacialExpression setSongs={setSongs} />
          <MoodSongs Songs={songs} />
        </>
      )}
    </>
  );
}

export default App;
