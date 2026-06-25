import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../../components/Layout/Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
