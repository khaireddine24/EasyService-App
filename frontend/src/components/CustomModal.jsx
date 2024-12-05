import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const CustomModal = ({ 
  isOpen, 
  onSubmit, 
  children,
  isSubmitDisabled = false
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit();
    } catch (error) {
      console.error('Erreur lors de la soumission :', error);
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="
        bg-white 
        rounded-md 
        shadow-lg 
        p-4 
        sm:p-6 
        w-[85%] 
        md:max-w-2xl
        max-w-xl 
        mx-auto 
        space-y-4 
        max-h-[80vh]  
        overflow-y-auto    
      ">
        <DialogHeader className="text-center space-y-2">
          <DialogTitle className="
            text-2xl
            md:text-4xl 
            sm:text-2xl 
            font-bold 
            mb-2
            mt-6
          ">
            Bienvenue!
          </DialogTitle>
          <p className="
            text-sm 
            sm:text-base 
            text-gray-600 
           
          ">
            Nous sommes enchantés de vous compter parmi nous !<br/>
            Commencez par choisir votre domaine d'intervention
          </p>
        </DialogHeader>
        
        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          gap-3 
          sm:gap-4
        ">
          {children}
        </div>
        
        <div className="
          flex 
          justify-center 
          items-center 
          w-full 
          mt-4 
          sm:mt-6
        ">
          <Button 
            variant="default" 
            onClick={handleSubmit}
            disabled={isSubmitting || isSubmitDisabled}
            className="
              w-full 
              sm:w-auto 
              px-4 
              sm:px-6 
              py-2 
              bg-yellow-500 
              hover:bg-yellow-600 
              disabled:opacity-50 
              disabled:cursor-not-allowed
            "
          >
            {isSubmitting ? 'Validation...' : 'Continuer'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;