import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, LogOut, User } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import useAuthStore from '@/store/authStore';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const scrollToSection = (sectionId) => {
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

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const NavLinks = () => (
    <div className="flex flex-col md:flex-row md:space-x-4">
      {!isAuthenticated?
      <Button 
        variant="ghost" 
        onClick={() => scrollToSection('qui-sommes-nous')}
        className="text-gray-700 hover:text-yellow-600 md:w-auto w-full md:justify-center justify-start"
      >
        Qui Sommes-Nous
      </Button>
      :<p></p>}

      {!isAuthenticated?
      
      <Button 
        variant="ghost" 
        onClick={() => scrollToSection('nos-services')}
        className="text-gray-700 hover:text-yellow-600 md:w-auto w-full md:justify-center justify-start"
      >
        Les Services
      </Button>
      :<p></p>}

    {!isAuthenticated?  
      <Button 
        variant="ghost" 
        onClick={() => scrollToSection('')}
        className="text-gray-700 hover:text-yellow-600 md:w-auto w-full md:justify-center justify-start"
      >
        Listing des prestataires
      </Button>
      :<p></p>}

    {!isAuthenticated?  
      <Button 
        variant="ghost" 
        onClick={() => scrollToSection('')}
        className="text-gray-700 hover:text-yellow-600 md:w-auto w-full md:justify-center justify-start"
      >
        Avis Client
      </Button>
      :<p></p>}
    </div>
  );

  const AuthButtons = () => {
    if (isAuthenticated) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full">
              <User className="h-5 w-5 mr-2" />
              {user?.firstName || 'Mon Compte'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => navigate('/profile')}>
              <User className="mr-2 h-4 w-4" />
              <span>Profil</span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={handleLogout} className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Déconnexion</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  
    return (
      <>
        {/* <Button 
          variant="outline" 
          className="flex items-center space-x-2 hover:bg-[#ddc61971]"
          asChild
        >
          <Link to="/Login">Connexion</Link>
        </Button>
  
        <Button 
          variant="outline" 
          className="flex items-center space-x-2 bg-[#DDC619] hover:bg-[#ddc61971]"
          asChild
        >
          <Link to="/role-option" className='text-white'>Rejoignez-nous</Link>
        </Button> */}
        <div></div>
      </>
    );
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 px-4 py-3 flex items-center justify-between">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <Link to="/" className="text-2xl font-bold text-[#181C32] flex items-center">
          <img src="/svg/LogoIcon.svg" className="w-9 h-9" alt="logo" />
          Easy Service
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-1 justify-center">
        <NavLinks />
      </div>

      {/* Desktop Right Section */}
      <div className="hidden md:flex items-center space-x-4">
        <AuthButtons />
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
                <AuthButtons />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;