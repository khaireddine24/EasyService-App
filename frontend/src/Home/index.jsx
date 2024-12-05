import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Wrench,
  Clock,
  ChevronDown,
} from 'lucide-react';

import ServiceCard from '@/components/ServiceCard';
import { CommentCaMarche, EasyService } from '@/constants/constants';

// Nouveau composant Hero Section
const HeroSection = () => {
  const scrollToNextSection = () => {
    document
      .getElementById('comment-ca-marche')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex flex-col items-center justify-center overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-2 flex flex-col-reverse md:flex-row items-center justify-between relative z-10">
        <div className="text-center md:text-left w-full md:w-1/2 space-y-8 mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            La Plateforme de Services qu'il vous faut
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl">
            Easy Service : La plateforme intuitive pour particuliers et professionnels, 
            conçue pour trouver facilement des prestataires de qualité.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
            <Link to={'/Register'} className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto 
                  text-yellow-600 
                  hover:bg-yellow-50 
                  border-yellow-500 
                  hover:border-yellow-600 
                  py-3 px-8 
                  rounded-md
                  transition-all 
                  duration-300 
                  shadow-md 
                  hover:shadow-lg"
              >
                Devenir Client
              </Button>
            </Link>
            <Link to={'/ServiceSelectionPage'} className="w-full sm:w-auto">
              <Button 
                className="w-full sm:w-auto 
                  bg-yellow-500 
                  hover:bg-yellow-600 
                  text-white 
                  py-3 px-8 
                  rounded-md 
                  transition-all 
                  duration-300 
                  shadow-md 
                  hover:shadow-lg"
              >
                Devenir Prestataire
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center px-4">
          <img 
            src="/images/ServIcon.png" 
            alt="Service Icon" 
            className="max-w-full h-auto md:ml-[10%] w-3/4 md:w-full 
              transition-transform 
              duration-500 
              hover:scale-105 
              transform 
              hover:-rotate-3"
          />
        </div>
      </div>

      {/* Scroll Button with Enhanced Animation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button 
          onClick={scrollToNextSection}
          className="group relative p-3 rounded-full 
            bg-white 
            shadow-md 
            hover:bg-yellow-50 
            transition-all 
            duration-300 
            ease-in-out 
            focus:outline-none 
            focus:ring-2 
            focus:ring-yellow-500 
            focus:ring-opacity-50 
            animate-bounce-slow"
        >
          <ChevronDown 
            size={32} 
            className="text-yellow-500 
              group-hover:text-yellow-600 
              transition-all
              hover:scale-125
              duration-300"
          />
        </button>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section Fullscreen */}
      <HeroSection />

      {/* Comment ça marche */}
      <section id="comment-ca-marche" className="py-12 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            Comment ça Marche ?
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {CommentCaMarche.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="items-center">
                  <div className="mb-4 text-yellow-500">
                    {item.icon}
                  </div>
                  <CardTitle className="text-center">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Qui Sommes-Nous */}
      <section id="qui-sommes-nous" className="py-16 md:py-28  bg-gray-100">
        <div className="container mx-auto px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            Qui Sommes-Nous ?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <p className="text-gray-700 md:text-2xl mb-4 md:mb-6">
              Cette plateforme a pour objectif de mettre en relation toute personne souhaitant avoir ou répondre a des services 
              du quotidien.
              </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <img
                src="/images/teams-pro.png"
                alt="EasyService Team"
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nos Services */}
      <section id="nos-services" className="py-12 md:py-28 sm:py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            les Services
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <ServiceCard
              icon={Wrench}
              title="Réparation"
              description="Réparation électroménager, plomberie, électricité"
            />
            <ServiceCard
              icon={Clock}
              title="Ménage"
              description="Nettoyage résidentiel et professionnel"
            />
            <ServiceCard
              icon={Briefcase}
              title="Déménagement"
              description="Services professionnels de déménagement"
            />
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="bg-blue-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            Pourquoi EasyService ?
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EasyService.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="items-center">
                  <div className="mb-4 text-blue-500">
                    {item.icon}
                  </div>
                  <CardTitle className="text-center">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;