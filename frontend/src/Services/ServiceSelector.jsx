import React from "react";
import { Card } from "@/components/ui/card";
import { Categories } from "@/constants/constants";
import { Checkbox } from "@/components/ui/checkbox";

const ServiceSelector = ({ onServiceSelect, selectedServices }) => {
  return (
    <>
      {Categories.map((category) => (
        <Card
          key={category.id}
          className={`relative flex flex-col items-start cursor-pointer h-28 group ${
            !category.allowed 
              ? 'opacity-50 cursor-not-allowed' 
              : selectedServices.includes(category.label) 
                ? 'border-2 border-yellow-500 bg-yellow-50' 
                : 'hover:bg-gray-50'
          }`}
          onClick={() => category.allowed && onServiceSelect(category.label)}
        >
          {category.allowed && (
            <div className="absolute top-2 left-2">
              <Checkbox
                checked={selectedServices.includes(category.label)}
                onCheckedChange={() => onServiceSelect(category.label)}
                className={`
                  data-[state=checked]:bg-yellow-500 
                  data-[state=checked]:border-yellow-500
                  data-[state=checked]:hover:bg-yellow-600
                  transition-colors
                  duration-300
                `}
              />
            </div>
          )}
          
          <h3 className={`text-lg font-bold text-center mt-8 ml-3 ${
            !category.allowed ? 'text-gray-400' : ''
          }`}>
            {category.label}
          </h3>
          
          {!category.allowed && (
            <div className="absolute top-2 left-2">
              <Checkbox
                checked={false}
                disabled
                className='cursor-not-allowed opacity-50'
              />
            </div>
          )}
        </Card>
      ))}
    </>
  );
};

export default ServiceSelector;