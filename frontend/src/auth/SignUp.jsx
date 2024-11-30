import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SchemaInscription = z
  .object({
    prenom: z.string().min(2, 'Le prénom est requis'),
    nom: z.string().min(2, 'Le nom est requis'),
    email: z.string().email('Adresse email invalide'),
    telephone: z.string().min(8, 'Le numéro de téléphone est requis'),
    adresse: z.string().min(5, 'L\'adresse complète est requise'),
    motDePasse: z
      .string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
      .regex(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        'Le mot de passe doit contenir une majuscule, un chiffre et un caractère spécial',
      ),
    confirmationMotDePasse: z.string(),
  })
  .refine((data) => data.motDePasse === data.confirmationMotDePasse, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmationMotDePasse'],
  });

export const SignUp = () => {
  const [afficherMotDePasse, setAfficherMotDePasse] = useState(false);
  const [afficherConfirmationMotDePasse, setAfficherConfirmationMotDePasse] = useState(false);
  const [role, setRole] = useState('');
  const location = useLocation();

  useEffect(() => {
    const parametresURL = new URLSearchParams(location.search);
    const roleDansURL = parametresURL.get('role') || 'Client';
    setRole(roleDansURL);
  }, [location.search]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SchemaInscription),
  });

  const onSubmit = async (data) => {
    const { confirmationMotDePasse, ...donneesAEnvoyer } = data;
    console.log(donneesAEnvoyer);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {role === 'Client' ? (
        <p className='text-center text-base sm:text-lg mb-4'>
          S'inscrire en tant que <Link to={`/Register?role=Provider`} className='text-blue-500 underline'>Prestataire</Link>
        </p>
      ) : (
        <p className='text-center text-base sm:text-lg mb-4'>
          S'inscrire en tant que <Link to={`/Register?role=Client`} className='text-blue-500 underline'>Client</Link>
        </p>
      )}

      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-2xl">
            Inscription {role}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Section - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="prenom"
                control={control}
                render={({ field }) => (
                  <div>
                    <Label>Prénom</Label>
                    <Input {...field} placeholder="Prénom" />
                    {errors.prenom && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.prenom.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="nom"
                control={control}
                render={({ field }) => (
                  <div>
                    <Label>Nom</Label>
                    <Input {...field} placeholder="Nom" />
                    {errors.nom && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.nom.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Contact Section - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <div>
                    <Label>Email</Label>
                    <Input
                      {...field}
                      placeholder="votre.email@exemple.com"
                      type="email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="telephone"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div>
                    <Label>Numéro de téléphone</Label>
                    <PhoneInput
                      placeholder="Entrez votre numéro"
                      value={value}
                      onChange={onChange}
                      defaultCountry="FR"
                      international
                      withCountryCallingCode
                      className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-300 sm:text-sm"
                    />
                    {errors.telephone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.telephone.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Address */}
            <Controller
              name="adresse"
              control={control}
              render={({ field }) => (
                <div>
                  <Label>Adresse</Label>
                  <Input {...field} placeholder="Adresse complète" />
                  {errors.adresse && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.adresse.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Password Section - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="motDePasse"
                control={control}
                render={({ field }) => (
                  <div>
                    <Label>Mot de passe</Label>
                    <div className="relative">
                      <Input
                        {...field}
                        type={afficherMotDePasse ? 'text' : 'password'}
                        placeholder="Mot de passe"
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setAfficherMotDePasse(!afficherMotDePasse)}
                      >
                        {afficherMotDePasse ? <EyeOff size={20} className='bg-white'/> : 
                        <Eye size={20} className='bg-white'/>}
                      </button>
                    </div>
                    {errors.motDePasse && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.motDePasse.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="confirmationMotDePasse"
                control={control}
                render={({ field }) => (
                  <div>
                    <Label>Confirmer le mot de passe</Label>
                    <div className="relative">
                      <Input
                        {...field}
                        type={afficherConfirmationMotDePasse ? 'text' : 'password'}
                        placeholder="Confirmer le mot de passe"
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() =>
                          setAfficherConfirmationMotDePasse(!afficherConfirmationMotDePasse)
                        }
                      >
                        {afficherConfirmationMotDePasse ? (
                          <EyeOff size={20} className='bg-white'/>
                        ) : (
                          <Eye size={20} className='bg-white'/>
                        )}
                      </button>
                    </div>
                    {errors.confirmationMotDePasse && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.confirmationMotDePasse.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-700 mt-4"
            >
              S'inscrire
            </Button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500 text-sm">Ou continuez avec</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Social Login */}
            <div className="flex justify-center">
              <Button 
                variant="outline" 
                className="flex items-center justify-center space-x-2 w-full max-w-lg"
              >
                <img src='/svg/GoogleIcon.svg' alt='icon' className='w-4 h-4'/>
                <span>Google</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;