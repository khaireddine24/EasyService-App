import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Wrench,
  Clock,
} from 'lucide-react';

import ServiceCard from '@/components/ServiceCard';
import { CommentCaMarche, EasyService } from '@/constants/constants';

const Home = () => {
  const scrollToServices = () => {
    document
      .getElementById('nos-services')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAboutUs = () => {
    document
      .getElementById('qui-sommes-nous')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-12 md:py-20 flex flex-col-reverse md:flex-row items-center justify-between">
          <div className="text-center md:text-left w-full md:w-1/2 space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
              La Plateforme de Services qu'il vous faut
            </h1>
            <p className="text-base md:text-xl mb-6 text-gray-600 max-w-2xl">
              Easy Service La plateforme intuitive pour particuliers et
              professionnels, conçue pour trouver facilement des prestataires de
              qualité.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <Button
                variant="outline"
                className="w-full sm:w-auto text-yellow-500 hover:text-yellow-600 py-3 px-8 rounded-md text-lg border border-yellow-500"
                onClick={scrollToServices}
              >
                Explorer
              </Button>
              <Link to={'/role-option'} className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-8 rounded-md text-lg">
                  Créer un compte gratuit
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center">
            <img 
              src="/images/ServIcon.png" 
              alt="Service Icon" 
              className="max-w-full h-auto md:ml-[10%] w-3/4 md:w-full"
            />
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-12 md:py-16 bg-gray-50">
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
      <section id="qui-sommes-nous" className="py-12 md:py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            Qui Sommes-Nous ?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <p className="text-gray-700 mb-4 md:mb-6">
                EasyService est une plateforme innovante qui simplifie la
                connexion entre clients et prestataires de services. Notre
                mission est de rendre les services du quotidien plus
                accessibles, rapides et fiables.
              </p>
              <p className="text-gray-700">
                Nous croyons en la qualité, la transparence et la simplicité.
                Grâce à notre réseau de professionnels soigneusement
                sélectionnés, nous garantissons des services de haute qualité à
                chaque interaction.
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
      <section id="nos-services" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            Nos Services Populaires
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