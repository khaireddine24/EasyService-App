import React, { useState, useEffect } from 'react';
import CustomModal from '@/components/CustomModal';
import CategorySelector from './CategorySelector';
import ServiceSelector from './ServiceSelector';

const ServiceSelectionPage = ({ isLoggedIn, name, onServiceSubmit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      setIsModalOpen(true);
    }
  }, [isLoggedIn]);

  const handleCategorySelect = (categories) => {
    setSelectedCategories(categories);
    setSelectedServices([]);
  };

  const handleServiceSelect = (services) => {
    setSelectedServices(services);
  };

  const handleSubmit = async () => {
    if (selectedCategories.length === 0) {
      toast.error('Veuillez sélectionner au moins une catégorie');
      return false;
    }

    if (selectedServices.length === 0) {
      toast.error('Veuillez sélectionner au moins un service');
      return false;
    }

    try {
      console.log(selectedCategories);
      console.log(selectedServices);
      setIsModalOpen(false);
      return true;
    } catch (error) {
      console.error('Submission error:', error);
      alert('Erreur lors de la soumission. Veuillez réessayer.');
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
      <p className='text-lg'>Bonjour, <span className='text-lg font-bold'>{name}</span></p>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <CategorySelector onCategorySelect={handleCategorySelect} />
        <ServiceSelector 
          selectedCategories={selectedCategories}
          onServiceSelect={handleServiceSelect}
        />
      </div>
    </CustomModal>
  );
};

export default ServiceSelectionPage;