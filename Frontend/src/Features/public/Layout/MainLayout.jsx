import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <Sidebar />
      <div className="flex-1 ml-[80px] md:ml-[80px] overflow-auto flex flex-col relative">
        <Navbar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
