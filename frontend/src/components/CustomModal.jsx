import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const CustomModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  children,
  disableClose = false 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit();
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={!disableClose ? onClose : undefined}
    >
      <DialogContent className="bg-white rounded-md shadow-lg p-6 w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">
            Sélectionnez vos services
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">{children}</div>
        <div className="text-right mt-6 space-x-2">
          <Button 
            variant="outline" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Validation...' : 'Valider'}
          </Button>
          {!disableClose && (
            <Button 
              variant="secondary" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Fermer
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;