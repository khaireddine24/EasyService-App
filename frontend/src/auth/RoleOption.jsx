import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { UserRound, BriefcaseBusiness } from 'lucide-react';

const RoleOption = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  const handleCreateAccount = () => {
    if (selectedRole) {
      navigate(`/RegisterClient`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Choose Your Role
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <button 
              onClick={() => handleRoleSelection('client')}
              className={`w-full h-48 flex flex-col items-center justify-center space-y-4 rounded-lg border-2 transition-all duration-300 
                ${selectedRole === 'client' 
                  ? 'bg-blue-600 text-white border-blue-700' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'}`}
            >
              <UserRound size={48} className={selectedRole === 'client' ? 'text-white' : 'text-gray-500'} />
              <span className="text-lg font-semibold">I'm a Client</span>
              <p className="text-sm text-center px-4">
                Hiring for a project and looking to find the right talent
              </p>
            </button>

            <button 
              onClick={() => handleRoleSelection('provider')}
              className={`w-full h-48 flex flex-col items-center justify-center space-y-4 rounded-lg border-2 transition-all duration-300 
                ${selectedRole === 'provider' 
                  ? 'bg-blue-600 text-white border-blue-700' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'}`}
            >
              <BriefcaseBusiness size={48} className={selectedRole === 'provider' ? 'text-white' : 'text-gray-500'} />
              <span className="text-lg font-semibold">I'm a Provider</span>
              <p className="text-sm text-center px-4">
                Looking for work and ready to showcase my skills
              </p>
            </button>
          </div>

          <Button 
            onClick={handleCreateAccount} 
            disabled={!selectedRole}
            className="w-medium bg-blue-500 ml-[36%]"
          >
            {selectedRole 
              ? `Create Account as ${selectedRole === 'client' ? 'Client' : 'Provider'}` 
              : 'Select a Role First'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleOption;