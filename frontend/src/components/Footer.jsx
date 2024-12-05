import React from 'react';
import { Link } from 'react-router-dom';
import { Contact, LienRapide, NosService, Socials } from '@/constants/constants';

const Footer = () => {

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">Easy Service</h2>
          <p className="text-gray-300 text-sm">
            Votre plateforme de services innovante qui connecte clients et prestataires de manière simple et efficace.
          </p>
          <div className="flex space-x-4 mt-4">
            {
              Socials.map((item,index)=>(
                <Link key={index} to={item.link} className="text-yellow-400 hover:text-yellow-300">
                  {item.icon}
                </Link>
              ))
            }
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-lg">Liens Rapides</h3>
          <ul className="space-y-2">
            {
              LienRapide.map((item,index)=>(
                <li key={index}>
                  <Link to={item.link} className="text-gray-300 hover:text-yellow-200">
                    {item.title}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-lg">Nos Services</h3>
          <ul className="space-y-2">
            {
              NosService.map((item,index)=>(
                <li key={index} className="text-gray-300 hover:text-yellow-200">
                  {item.title}
                </li>
              ))
            }
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-lg">Contactez-nous</h3>
          <ul className="space-y-3">
            {Contact.map((item,index)=>(
              <li key={index} className="flex items-center">
                {item.icon}
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 text-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Easy Service. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;