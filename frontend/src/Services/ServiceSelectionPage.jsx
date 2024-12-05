import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomModal from "@/components/CustomModal";
import ServiceSelector from "./ServiceSelector";

const ServiceSelectionPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedServices, setSelectedServices] = useState([]);
  const navigate = useNavigate();

  // Charger les services précédemment sélectionnés du localStorage
  useEffect(() => {
    const savedServices = JSON.parse(localStorage.getItem('selectedServices') || '[]');
    setSelectedServices(savedServices);
  }, []);

  const handleServiceSelect = (service) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = () => {
    if (selectedServices.length === 0) {
      toast.error('Veuillez sélectionner au moins un service.');
      return Promise.reject();
    }
    
    // Enregistrer les services sélectionnés dans le localStorage comme un tableau
    localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
    
    // Fermer la modal et naviguer vers la page d'inscription
    setIsModalOpen(false);
    navigate('/register?role=prestataire');
    
    return Promise.resolve();
  };

  return (
    <CustomModal 
      isOpen={isModalOpen}
      onSubmit={handleSubmit}
      isSubmitDisabled={selectedServices.length === 0}
    >
      <ServiceSelector 
        onServiceSelect={handleServiceSelect}
        selectedServices={selectedServices}
      />
    </CustomModal>
  );
};

export default ServiceSelectionPage;