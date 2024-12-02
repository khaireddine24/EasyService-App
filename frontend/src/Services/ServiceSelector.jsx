// ServiceSelector.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Categories } from '@/constants/constants';

const ServiceSelector = ({ selectedCategories, onServiceSelect }) => {
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    // Reset services when categories change
    setSelectedServices([]);
  }, [selectedCategories]);

  const handleServiceSelect = (service) => {
    const updatedServices = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service];
    
    setSelectedServices(updatedServices);
    onServiceSelect(updatedServices);
  };

  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gray-50 px-4 py-3 border-b">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Sélectionnez vos services
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4 max-h-96 overflow-y-auto">
        {selectedCategories.length === 0 ? (
          <p className="text-gray-500">Veuillez sélectionner des catégories d'abord</p>
        ) : (
          selectedCategories.map((category) => (
            <div key={category} className="border-b pb-4">
              <h3 className="text-gray-700 font-medium mb-2">{category}</h3>
              <ul className="space-y-2">
                {Categories[category].map((service) => (
                  <li key={service} className="flex items-center space-x-3">
                    <Checkbox
                      checked={selectedServices.includes(service)}
                      onCheckedChange={() => handleServiceSelect(service)}
                      className="shrink-0"
                    />
                    <span className="text-gray-700">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceSelector;