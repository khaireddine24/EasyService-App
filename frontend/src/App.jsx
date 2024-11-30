import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Login from "@/auth/Login";
import { SignUp } from "@/auth/SignUp";
import Home from "@/Home";
import RoleOption from "@/auth/RoleOption";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<SignUp />} />
        <Route path='role-option' element={<RoleOption />} />
      </Route>
    </Routes>
  );
}

export default App;