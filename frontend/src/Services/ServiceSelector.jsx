import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Categories } from '@/constants/constants';
import { Button } from '@/components/ui/button';

const ServiceSelector = ({ onServiceSelect }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const MAX_SERVICES = 3;
  const itemsPerPage = 6;

  // Flatten all services from all categories
  const allServices = Object.values(Categories).flat();
  
  const filteredServices = allServices.filter((service) =>
    service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  const handleServiceSelect = (service) => {
    const updatedServices = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service];
    
    if (updatedServices.length <= MAX_SERVICES) {
      setSelectedServices(updatedServices);
      onServiceSelect(updatedServices);
    }
  };

  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gray-50 px-4 py-3 border-b">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Sélectionnez vos services (max 3)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <input
          type="text"
          placeholder="Rechercher un service..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        
        <div className="grid grid-cols-2 gap-3">
          {paginatedServices.map((service) => (
            <div key={service} className="flex items-center space-x-3">
              <Checkbox
                checked={selectedServices.includes(service)}
                onCheckedChange={() => handleServiceSelect(service)}
                disabled={
                  !selectedServices.includes(service) && 
                  selectedServices.length >= MAX_SERVICES
                }
              />
              <span className="text-gray-700 truncate">{service}</span>
            </div>
          ))}
        </div>

        {paginatedServices.length === 0 && (
          <p className="text-center text-gray-500">Aucun service trouvé</p>
        )}

        <div className="flex justify-between items-center mt-4">
          <Button 
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Précédent
          </Button>
          
          <span className="text-sm text-gray-600">
            Page {currentPage} / {totalPages}
          </span>
          
          <Button 
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Suivant
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceSelector;