import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SuccessStep = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center mb-4">
        <CheckCircle className="w-20 h-20 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold">Mot de passe réinitialisé</h2>
      <p className="text-gray-600 mb-6">
        Votre mot de passe a été réinitialisé avec succès.
      </p>
      <Button 
        onClick={() => navigate('/login')} 
        className="w-full bg-yellow-500 hover:bg-yellow-600"
      >
        Retour à la connexion
      </Button>
    </div>
  );
};

export default SuccessStep;