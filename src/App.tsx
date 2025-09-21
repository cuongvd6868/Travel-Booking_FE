import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { UserProvider } from './context/useAuth';
import Navbar from './components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer/Footer';

function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/login';

  return (
    <UserProvider>
      {showNavbar && <Navbar/>}
      <Outlet/>
      <Footer/>
      <ToastContainer />
    </UserProvider>
  );
}

export default App;