import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const VerificationCodeSchema = z.object({
  otpCode: z.string().length(6, 'Le code doit contenir 6 caractères')
});

const VerificationStep = ({ email, onVerificationSuccess, onResendCode }) => {
  const [otpValues, setOtpValues] = useState(Array(6).fill(''));
  const inputRefs = useRef([]);

  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(VerificationCodeSchema),
    defaultValues: {
      otpCode: ''
    }
  });

  useEffect(() => {
    setValue('otpCode', otpValues.join(''));
  }, [otpValues, setValue]);

  const handleOtpChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      // Focus next input if filled
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerificationSubmit = () => {
    // Logique de vérification du code
    console.log('Code de vérification:', otpValues.join(''));
    onVerificationSuccess();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Vérification</h2>
        <p className="text-gray-600">
          Un code de 6 chiffres a été envoyé à {email}
        </p>
      </div>

      <form onSubmit={handleSubmit(handleVerificationSubmit)} className="space-y-4">
        <div className="flex justify-center space-x-2">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <Controller
              key={index}
              name="otpCode"
              control={control}
              render={() => (
                <Input
                  ref={(ref) => inputRefs.current[index] = ref}
                  type="text"
                  maxLength={1}
                  value={otpValues[index]}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl"
                />
              )}
            />
          ))}
        </div>

        {errors.otpCode && (
          <p className="text-red-500 text-sm text-center">
            {errors.otpCode.message}
          </p>
        )}

        <Button 
          type="submit" 
          className="w-full bg-yellow-500 hover:bg-yellow-600"
        >
          Vérifier le code
        </Button>

        <div className="text-center">
          <button 
            type="button" 
            className="text-blue-600 hover:underline"
            onClick={onResendCode}
          >
            Renvoyer le code
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerificationStep;