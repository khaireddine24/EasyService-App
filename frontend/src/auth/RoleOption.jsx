import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { UserRound, BriefcaseBusiness } from 'lucide-react';
import { Link } from 'react-router-dom';

const RoleOption = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  const handleCreateAccount = () => {
    navigate(`/Register?role=${selectedRole}`);
  };

  const getCardTitle = () => {
    if (selectedRole === 'client') {
      return "Choisissez votre compte Client";
    } else if (selectedRole === 'prestataire') {
      return "Choisissez votre compte Prestataire";
    }
    return "Choisissez votre rôle";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md sm:max-w-xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-bold text-center">
            {getCardTitle()}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <button 
              onClick={() => handleRoleSelection('client')}
              className={`w-full h-40 sm:h-48 flex flex-col items-center justify-center space-y-3 sm:space-y-4 rounded-lg border-2 transition-all duration-300 
                ${selectedRole === 'client' 
                  ? 'bg-yellow-500 text-white border-yellow-700' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-yellow-500'}`}
            >
              <UserRound size={40} sm:size={48} className={selectedRole === 'client' ? 'text-white' : 'text-gray-500'} />
              <span className="text-base sm:text-lg font-semibold">Je suis un Client</span>
              <p className="text-xs sm:text-sm text-center px-2 sm:px-4">
                Embaucher pour un projet et chercher les bons talents
              </p>
            </button>

            <button 
              onClick={() => handleRoleSelection('prestataire')}
              className={`w-full h-40 sm:h-48 flex flex-col items-center justify-center space-y-3 sm:space-y-4 rounded-lg border-2 transition-all duration-300 
                ${selectedRole === 'prestataire' 
                  ? 'bg-yellow-500 text-white border-yellow-700' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-yellow-500'}`}
            >
              <BriefcaseBusiness size={40} sm:size={48} className={selectedRole === 'prestataire' ? 'text-white' : 'text-gray-500'} />
              <span className="text-base sm:text-lg font-semibold">Je suis un Prestataire</span>
              <p className="text-xs sm:text-sm text-center px-2 sm:px-4">
                À la recherche d'un emploi et prêt à mettre en valeur mes compétences
              </p>
            </button>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <Button 
              onClick={handleCreateAccount} 
              disabled={!selectedRole}
              className="w-full sm:w-auto px-6 bg-yellow-500 hover:bg-yellow-600"
            >
              {selectedRole 
                ? `Créer un compte en tant que ${selectedRole === 'client' ? 'Client' : 'Prestataire'}` 
                : 'Sélectionnez un rôle'}
            </Button>
            <p className='text-center text-sm'>
              Vous avez déjà un compte ? <Link to={'/Login'} className='text-blue-500 hover:underline'>Se connecter</Link> 
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleOption;