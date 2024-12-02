import React,{useState} from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail } from 'lucide-react';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuthStore from '@/store/authStore';

const EmailSchema = z.object({
  email: z.string().email('Adresse e-mail invalide')
});

const EmailStep = ({ onSubmit }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(EmailSchema),
  });
  const { sendResetOTP } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const handleEmailSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await sendResetOTP(data.email);
      onSubmit(data.email);
    } catch (err) {
      setError(err.response?.data?.message || 'Error sending reset code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Mot de passe oublié</h2>
        <p className="text-gray-600">Entrez votre adresse e-mail pour réinitialiser votre mot de passe</p>
      </div>

      <form onSubmit={handleSubmit(handleEmailSubmit)} className="space-y-4">
        <div>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <div>
                <Label className="mb-2">Adresse email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <Input
                    {...field}
                    type="email"
                    placeholder="your.email@example.com"
                    className="pl-10"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
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
        {loading ? 'Envoi en cours...' : 'Envoyer le code de vérification'}
      </Button>
      </form>
    </div>
  );
};

export default EmailStep;