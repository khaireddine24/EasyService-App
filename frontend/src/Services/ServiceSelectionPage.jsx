import React, { useState, useEffect } from 'react';
import CustomModal from '@/components/CustomModal';
import ServiceSelector from './ServiceSelector';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ServiceSelectionPage = ({ isLoggedIn, name, onServiceSubmit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      setIsModalOpen(true);
    }
  }, [isLoggedIn]);

  const handleServiceSelect = (services) => {
    setSelectedServices(services);
  };

  const handleSubmit = async () => {
    if (selectedServices.length === 0) {
      toast.error('Veuillez sélectionner au moins un service');
      return false;
    }

    if (selectedServices.length > 3) {
      toast.error('Vous ne pouvez sélectionner que 3 services maximum');
      return false;
    }

    try {
      // Votre logique de soumission ici
      console.log('Services sélectionnés:', selectedServices);
      localStorage.setItem('Services',selectedServices);
      
      // Appel à onServiceSubmit si nécessaire
      if (onServiceSubmit) {
        await onServiceSubmit(selectedServices);
      }

      setIsModalOpen(false);
      navigate('/Register?role=prestataire');
      return true;
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Erreur lors de la soumission. Veuillez réessayer.');
      return false;
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <CustomModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSubmit={handleSubmit}
      disableClose={true}
      className="bg-white shadow-lg rounded-lg w-full max-w-4xl"
    >
      <p className='text-lg mb-4'>
        Bienvenue dans notre communauté! Commencez par sélectionner 
        jusqu'à trois services qui vous conviennent le mieux {' '}
        <span className='font-bold'>{name}</span>.
      </p>
      <div className="p-6">
        <ServiceSelector 
          onServiceSelect={handleServiceSelect}
        />
      </div>
    </CustomModal>
  );
};

export default ServiceSelectionPage;