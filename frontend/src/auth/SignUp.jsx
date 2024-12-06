import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff,Loader } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Schéma de validation Zod
const SchemaInscription = z
  .object({
    prenom: z.string().min(2, 'Le prénom est requis'),
    nom: z.string().min(2, 'Le nom est requis'),
    email: z.string().email('Adresse email invalide'),
    telephone: z.string().min(8, 'Le numéro de téléphone est requis'),
    adresse: z.object({
      label: z.string().min(5, 'L\'adresse complète est requise'),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
    }),
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
  const [suggestions, setSuggestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { register,updateService} = useAuthStore();

  useEffect(() => {
    const parametresURL = new URLSearchParams(location.search);
    const roleDansURL = parametresURL.get('role') || 'client';
    setRole(roleDansURL);
  }, [location.search]);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SchemaInscription),
    defaultValues: {
      adresse: { label: '', latitude: undefined, longitude: undefined }
    }
  });

  const rechercherAdresse = async (query) => {
    const trimmedQuery = query.trim().toLowerCase();
    
    if (trimmedQuery.length < 3) {
      setSuggestions([]);
      return;
    }
  
    try {
      const params = new URLSearchParams({
        q: trimmedQuery,
        limit: '5'
      });
      // Gérer spécifiquement les codes postaux
      if (/^\d{5}$/.test(trimmedQuery)) {
        params.set('postcode', trimmedQuery);
      }
  
      const reponse = await fetch(
        `https://api-adresse.data.gouv.fr/search/?${params.toString()}`
      );
      const donnees = await reponse.json();

      const filteredSuggestions = donnees.features.filter((suggestion) => {
        if (!suggestion.properties || !suggestion.geometry) return false;
  
        const suggestionLabel = suggestion.properties.label.toLowerCase();
        const suggestionPostcode = suggestion.properties.postcode || '';
        return (
          suggestionLabel.includes(trimmedQuery) || 
          suggestionPostcode.includes(trimmedQuery) || 
          (suggestion.geometry.coordinates && 
           suggestion.geometry.coordinates.length === 2)
        );
      });
  
      const sortedSuggestions = filteredSuggestions.sort((a, b) => {
        const aLabel = a.properties.label.toLowerCase();
        const bLabel = b.properties.label.toLowerCase();
        const aExactMatch = aLabel === trimmedQuery || 
                            a.properties.postcode === trimmedQuery;
        const bExactMatch = bLabel === trimmedQuery || 
                            b.properties.postcode === trimmedQuery;
        if (aExactMatch && !bExactMatch) return -1;
        if (!aExactMatch && bExactMatch) return 1;
        
        return 0;
      });
  
      setSuggestions(sortedSuggestions);
    } catch (erreur) {
      console.error('Erreur lors de la recherche d\'adresse:', erreur);
      setSuggestions([]);
      toast.error('Impossible de charger les suggestions d\'adresse');
    }
  };

  const selectionnerAdresse = (adresse) => {
    const adresseSelectionnee = {
      label: adresse.properties.label,
      latitude: adresse.geometry.coordinates[1],
      longitude: adresse.geometry.coordinates[0],
    };

    setValue('adresse', adresseSelectionnee);
    setSuggestions([]);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const donneesAEnvoyer = {
        firstName: data.prenom,
        lastName: data.nom,
        email: data.email,
        phone: data.telephone,
        address: data.adresse.label,
        role: role.toLowerCase(),
        password: data.motDePasse,
      };
    
      await register(donneesAEnvoyer);
      if(role==='prestataire'){
        // Récupérer les services depuis localStorage et les convertir en tableau
        const selectedServices = JSON.parse(localStorage.getItem('selectedServices') || '[]');
        await updateService(donneesAEnvoyer.email, selectedServices);
      }
      toast.success('Inscription effectuée avec succès');
      navigate('/Acceuil');
      
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      toast.error(
        error.response?.data?.message || 
        'Une erreur est survenue lors de l\'inscription'
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const adresseValue = watch('adresse.label');

  return (
    <>
    
    <div className="container mx-auto px-4 py-8">
      {role === 'client' ? (
        <p className='text-center text-base sm:text-lg mb-4'>
          S'inscrire en tant que <Link to={`/Register?role=prestataire`} className='text-blue-500'>Prestataire</Link>
        </p>
      ) : ( 
        <p className='text-center text-base sm:text-lg mb-4'>
          S'inscrire en tant que <Link to={`/Register?role=client`} className='text-blue-500'>Client</Link>
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
            {/* Section Nom - Grille réactive */}
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

            {/* Section Contact - Grille réactive */}
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

            {/* Adresse avec autocomplétion */}
            <Controller
              name="adresse"
              control={control}
              render={({ field }) => (
                <div>
                  <Label>Adresse</Label>
                  <div className="relative">
                    <Input
                      placeholder="Commencez à saisir votre adresse"
                      onChange={(e) => {
                        field.onChange({ 
                          ...field.value, 
                          label: e.target.value 
                        });
                        rechercherAdresse(e.target.value);
                      }}
                      value={adresseValue}
                    />
                    {suggestions.length > 0 && (
                      <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => selectionnerAdresse(suggestion)}
                          >
                            {suggestion.properties.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.adresse?.label && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.adresse.label.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Section Mot de passe - Grille réactive */}
            <div className="gap-2">
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
              /><br/>
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

            {/* Bouton de soumission */}
            <Button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-700 mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : 'S\'inscrire'}
            </Button>
            
          </form>
          <p className='text-sm text-center mt-5 '>Si vous avez déjà un compte?{' '} 
            <Link to={'/login'} className=' text-blue-500'>Se Connecter</Link>
          </p>
        </CardContent>
      </Card>
    </div>
    </>
  );
};

export default SignUp;