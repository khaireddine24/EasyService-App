import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuthStore from '@/store/authStore';

const ResetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(/[A-Z]/, 'Doit contenir au moins une majuscule')
    .regex(/[a-z]/, 'Doit contenir au moins une minuscule')
    .regex(/[0-9]/, 'Doit contenir au moins un chiffre'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

const ResetPasswordStep = ({ email, onResetSuccess }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { resetPassword } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleResetPasswordSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await resetPassword(email, data.newPassword);
      onResetSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Échec de la réinitialisation du mot de passe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Réinitialisation du mot de passe</h2>
        <p className="text-gray-600">Créez un nouveau mot de passe sécurisé</p>
      </div>

      <form onSubmit={handleSubmit(handleResetPasswordSubmit)} className="space-y-4">
        <div>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <div>
                <Label className="mb-2">Nouveau mot de passe</Label>
                <div className="relative">
                  <Input
                    {...field}
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Entrez votre nouveau mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
                )}
              </div>
            )}
          />
        </div>

        <div>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <div>
                <Label className="mb-2">Confirmez le mot de passe</Label>
                <div className="relative">
                  <Input
                    {...field}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirmez votre nouveau mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>
            )}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
       <Button 
        type="submit" 
        disabled={loading}
        className="w-full bg-yellow-500 hover:bg-yellow-600"
        >
        {loading ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
      </Button>
      </form>
    </div>
  );
};

export default ResetPasswordStep;
