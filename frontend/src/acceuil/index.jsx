import useAuthStore from '@/store/authStore'
import React from 'react'

const Acceuil = () => {
    const {user}=useAuthStore();
    const Services=localStorage.getItem('Services');
  return (
    <div>
      <h1>Acceuil</h1>
      <p>Bonjour {user?.firstName}</p>
      <p>Vos Services selectionnée est: {Services}</p>
    </div>
  )
}

export default Acceuil;
