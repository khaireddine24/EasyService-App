import useAuthStore from '@/store/authStore'
import React from 'react'

const Acceuil = () => {
    const {user}=useAuthStore();
    const Services=localStorage.getItem('selectedServices');
  return (
    <div className='p-5 mt-10'>
      <h1>Acceuil</h1>
      <p>Bonjour {user?.firstName}</p>
      <p>Vos Services selectionnée sont: {Services}</p>
    </div>
  )
}

export default Acceuil;
