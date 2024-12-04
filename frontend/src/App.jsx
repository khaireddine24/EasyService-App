import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Login from '@/auth/Login';
import { SignUp } from '@/auth/SignUp';
import Home from '@/Home';
import RoleOption from '@/auth/RoleOption';
import ForgotPassword from './auth/ForgotPassword';
import ServiceSelectionPage from './Services/ServiceSelectionPage';
import Acceuil from './acceuil';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthStore from './store/authStore';

const Layout = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow mt-16">
      <ToastContainer />
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  const {isAuthenticated,user}=useAuthStore();
  const handleSubmit=()=>{
    console.log("submit");
  }
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {!isAuthenticated?<Route index element={<Home />} />:<Route index path='Acceuil' element={<Acceuil/>} />}
        <Route path="register" element={<SignUp />} />
        <Route path="role-option" element={<RoleOption />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="login" element={<Login />} />
        <Route
          path="ServiceSelectionPage"
          element={
            <ServiceSelectionPage 
            isLoggedIn={true} 
            name={''}
            onSubmit={handleSubmit}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
