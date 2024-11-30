import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu 
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    // Close mobile menu
    setIsMenuOpen(false);

    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const NavLinks = () => (
    <div className="flex flex-col md:flex-row md:space-x-4">
      <Button 
        variant="ghost" 
        onClick={() => scrollToSection('qui-sommes-nous')}
        className="text-gray-700 hover:text-yellow-600 md:w-auto w-full md:justify-center justify-start"
      >
       
        Qui Sommes-Nous
      </Button>

      <Button 
        variant="ghost" 
        onClick={() => scrollToSection('nos-services')}
        className="text-gray-700 hover:text-yellow-600 md:w-auto w-full md:justify-center justify-start"
      >
       
        Nos Services
      </Button>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 px-4 py-3 flex items-center justify-between">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <Link to="/" className="text-2xl font-bold text-[#181C32] flex items-center">
          <img src="/svg/LogoIcon.svg" className="w-9 h-9" alt="logo" />
          EasyService
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-1 justify-center">
        <NavLinks />
      </div>

      {/* Desktop Right Section */}
      <div className="hidden md:flex items-center space-x-4">
        <Button 
          variant="outline" 
          className="flex items-center space-x-2 hover:bg-[#ddc61971]"
          asChild
        >
          <Link to="/Login" className="flex items-center">
            Connexion
          </Link>
        </Button>

        <Button 
          variant="outline" 
          className="flex items-center space-x-2 bg-[#DDC619] hover:bg-[#ddc61971]"
          asChild
        >
          <Link to="/role-option" className="flex items-center">
            Rejoindre-nous
          </Link>
        </Button>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SheetHeader>
              <SheetTitle className="flex items-center">
                <img src="/svg/LogoIcon.svg" className="w-9 h-9 mr-2" alt="logo" />
                EasyService
              </SheetTitle>
            </SheetHeader>
            
            <div className="flex flex-col space-y-4 mt-6">
              <NavLinks />

              <div className="border-t pt-4 space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full hover:bg-[#ddc61971]"
                  asChild
                >
                  <Link to="/Login" className="w-full">
                    Connexion
                  </Link>
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full bg-[#DDC619] hover:bg-[#ddc61971]"
                  asChild
                >
                  <Link to="/role-option" className="w-full">
                    Rejoindre-nous
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
