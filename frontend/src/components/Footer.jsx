import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';

const Footer = () => {

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-blue-500 mb-4">EasyService</h2>
          <p className="text-gray-300 text-sm">
            Votre plateforme de services innovante qui connecte clients et prestataires de manière simple et efficace.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-blue-400 hover:text-blue-300"><Facebook size={24} /></a>
            <a href="#" className="text-blue-400 hover:text-blue-300"><Twitter size={24} /></a>
            <a href="#" className="text-blue-400 hover:text-blue-300"><Instagram size={24} /></a>
            <a href="#" className="text-blue-400 hover:text-blue-300"><Linkedin size={24} /></a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-lg">Liens Rapides</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-300 hover:text-white">Accueil</Link></li>
            <li><Link to="/services" className="text-gray-300 hover:text-white">Services</Link></li>
            <li><Link to="/register" className="text-gray-300 hover:text-white">Inscription</Link></li>
            <li><Link to="/login" className="text-gray-300 hover:text-white">Connexion</Link></li>
            <li><Link to="/about" className="text-gray-300 hover:text-white">À Propos</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-lg">Nos Services</h3>
          <ul className="space-y-2">
            <li className="text-gray-300 hover:text-white">Réparation</li>
            <li className="text-gray-300 hover:text-white">Jardinage</li>
            <li className="text-gray-300 hover:text-white">Nettoyage</li>
            <li className="text-gray-300 hover:text-white">Déménagement</li>
            <li className="text-gray-300 hover:text-white">Bricolage</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-lg">Contactez-nous</h3>
          <ul className="space-y-3">
            <li className="flex items-center">
              <Mail size={20} className="mr-2 text-blue-400" />
              <span>support@easyservice.com</span>
            </li>
            <li className="flex items-center">
              <Phone size={20} className="mr-2 text-blue-400" />
              <span>+33 1 23 45 67 89</span>
            </li>
            <li className="flex items-center">
              <MapPin size={20} className="mr-2 text-blue-400" />
              <span>Paris, France</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 text-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} EasyService. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;