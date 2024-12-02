import React, { useState} from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff,Loader } from 'lucide-react';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuthStore from '@/store/authStore';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const LoginSchema = z.object({
  email: z.string().email('Adresse e-mail invalide'),
  password: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate=useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });
  const {login}=useAuthStore();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    console.log("Données validées :", data);
    try {
      await login(data.email, data.password);
      navigate('/ServiceSelectionPage');
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      toast.error(
        error.response?.data?.message || 
        'Une erreur est survenue lors de la connexion'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center flex items-center justify-center space-x-2">
              <span>Connectez-vous à votre compte</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Label className="mb-2">Adresse email</Label>
                      <Input
                        {...field}
                        type="email"
                        placeholder="your.email@example.com"
                        className="mt-2"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>

              <div>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Mot de Passe</Label>
                        <Link
                          to="/forgot-password"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Mot de passe oublié ?
                        </Link>
                      </div>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-700 transition-colors duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : 'Se Connecter'}
              </Button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Vous n'avez pas de compte ?{' '}
                  <Link
                    to="/register"
                    className="text-blue-600 hover:underline"
                  >
                    S'inscrire
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;