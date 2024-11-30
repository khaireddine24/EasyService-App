import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Briefcase, 
  CheckCircle, 
  Shield, 
  Wrench, 
  Clock, 
} from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
    <div className="mb-4 text-blue-600">
      <Icon size={48} />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Home = () => {
  const scrollToServices = () => {
    document.getElementById('nos-services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAboutUs = () => {
    document.getElementById('qui-sommes-nous')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Trouvez le Service Parfait, en un Clic
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            EasyService connecte instantanément les clients avec des prestataires de qualité pour tous vos besoins de services.
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              asChild 
              variant="secondary" 
              className="px-8 py-3 text-lg"
              onClick={scrollToServices}
            >
              <Link to="/">Nos Services</Link>
            </Button>
            <Button 
              asChild 
              variant="secondary" 
              className="px-8 py-3 text-lg"
            >
              <Link to="/role-option">Commencer</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Comment ça Marche ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Users size={64} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Inscrivez-vous</h3>
              <p>Créez votre compte client ou prestataire gratuitement</p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Wrench size={64} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Trouvez un Service</h3>
              <p>Parcourez nos services ou publiez votre besoin</p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <CheckCircle size={64} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Réservez & Profitez</h3>
              <p>Confirmez et recevez un service de qualité</p>
            </div>
          </div>
        </div>
      </section>

      {/* Qui Sommes-Nous */}
      <section id="qui-sommes-nous" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Qui Sommes-Nous ?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-700 mb-6">
                EasyService est une plateforme innovante qui simplifie la connexion entre clients et prestataires de services. 
                Notre mission est de rendre les services du quotidien plus accessibles, rapides et fiables.
              </p>
              <p className="text-gray-700">
                Nous croyons en la qualité, la transparence et la simplicité. Grâce à notre réseau de professionnels 
                soigneusement sélectionnés, nous garantissons des services de haute qualité à chaque interaction.
              </p>
            </div>
            <div className="flex justify-center">
              <img 
                src="/images/teams-pro.png" 
                alt="EasyService Team" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nos Services */}
      <section id="nos-services" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nos Services Populaires
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
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
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Pourquoi EasyService ?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield size={64} className="mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Sécurisé</h3>
              <p>Prestataires vérifiés et notés</p>
            </div>
            <div className="text-center">
              <CheckCircle size={64} className="mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Qualité</h3>
              <p>Services de haute qualité garantis</p>
            </div>
            <div className="text-center">
              <Clock size={64} className="mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Rapidité</h3>
              <p>Trouvez un service en quelques minutes</p>
            </div>
            <div className="text-center">
              <Users size={64} className="mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Communauté</h3>
              <p>Un réseau de professionnels locaux</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à Simplifier Vos Services ?
          </h2>
          <p className="text-xl mb-8">
            Rejoignez EasyService et découvrez la simplicité des services à la demande
          </p>
          <Button 
            asChild 
            variant="secondary" 
            className="px-10 py-4 text-xl"
          >
            <Link to="/role-option">Commencez Maintenant</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;