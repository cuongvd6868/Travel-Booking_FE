import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { UserProvider } from './context/useAuth';
import Navbar from './components/Navbar/Navbar';

function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/login';

  return (
    <UserProvider>
      {showNavbar && <Navbar/>}
      <Outlet/>
    </UserProvider>
  );
}

export default App;