import React from 'react';
import { Outlet } from 'react-router-dom';
import { UserProvider } from './context/useAuth';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <>
    <UserProvider>
      <Navbar/>
      <Outlet/>
    </UserProvider>
    </>
  );
}

export default App;
