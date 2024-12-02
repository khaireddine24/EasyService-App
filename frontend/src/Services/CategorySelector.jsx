// CategorySelector.tsx
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Categories } from '@/constants/constants';

const CategorySelector = ({ onCategorySelect }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const MAX_CATEGORIES = 3;

  const filteredCategories = Object.keys(Categories).filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const handleCategorySelect = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    
    // Limit to 3 categories
    if (updatedCategories.length <= MAX_CATEGORIES) {
      setSelectedCategories(updatedCategories);
      onCategorySelect(updatedCategories);
    }
  };

  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gray-50 px-4 py-3 border-b">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Sélectionnez vos catégories (max 3)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <input
          type="text"
          placeholder="Rechercher une catégorie..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        {paginatedCategories.length > 0 ? (
          paginatedCategories.map((category) => (
            <div key={category} className="flex items-center space-x-3">
              <Checkbox
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategorySelect(category)}
                disabled={
                  !selectedCategories.includes(category) && 
                  selectedCategories.length >= MAX_CATEGORIES
                }
              />
              <span className="text-gray-700">{category}</span>
            </div>
          ))
        ) : (
          <p>Aucune catégorie trouvée</p>
        )}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`px-4 py-2 border rounded-md ${
              currentPage === 1
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            disabled={currentPage === 1}
          >
            Précédent
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className={`px-4 py-2 border rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategorySelector;