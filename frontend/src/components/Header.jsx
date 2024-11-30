import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  UserPlus, 
  LogIn, 
  Users, 
  Briefcase,
  UsersRound 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      window.location.href=`/#${sectionId}`;
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center">
          EasyService
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          onClick={() => scrollToSection('qui-sommes-nous')}
          className="text-gray-700 hover:text-blue-600"
        >
         <UsersRound className='h-4 w-4'/> 
          Qui Sommes-Nous
        </Button>

        <Button 
          variant="ghost" 
          onClick={() => scrollToSection('nos-services')}
          className="text-gray-700 hover:text-blue-600"
        >
          <Briefcase className='h-4 w-4'/>  
          Nos Services
        </Button>

        <Button 
          variant="outline" 
          className="flex items-center space-x-2"
          asChild
        >
          <Link to="/role-option" className="flex items-center">
            <UserPlus className="mr-2 h-4 w-4" />
            S'inscrire
          </Link>
        </Button>

        <DropdownMenu open={isLoginDropdownOpen} onOpenChange={setIsLoginDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center space-x-2"
              onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Se connecter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem asChild>
              <Link 
                to="/Login?role=client" 
                className="flex items-center cursor-pointer"
              >
                <Users className="mr-2 h-4 w-4" />
                Client
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link 
                to="/Login?role=provider" 
                className="flex items-center cursor-pointer"
              >
                <Briefcase className="mr-2 h-4 w-4" />
                Prestataire
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;