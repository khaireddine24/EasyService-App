import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import EmailStep from './EmailStep';
import VerificationStep from './VerificationStep';
import ResetPasswordStep from './ResetPasswordStep';
import SuccessStep from './SuccessStep';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (submittedEmail) => {
    setEmail(submittedEmail);
    setStep(2);
  };

  const handleVerificationSuccess = () => {
    setStep(3);
  };

  const handleResetPasswordSuccess = () => {
    setStep(4);
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return <EmailStep onSubmit={handleEmailSubmit} />;
      case 2:
        return <VerificationStep 
          email={email} 
          onVerificationSuccess={handleVerificationSuccess} 
          onResendCode={() => setStep(1)} 
        />;
      case 3:
        return <ResetPasswordStep 
          email={email} 
          onResetSuccess={handleResetPasswordSuccess} 
        />;
      case 4:
        return <SuccessStep />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="p-8">
          {renderStep()}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;